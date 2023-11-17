import { ERRORS } from '@/utils/constants';
import { InferType, number, object, ValidationError } from 'yup';
import { get } from 'lodash';
import { nameValidation, parseValidationErrors, timestampValidation } from '@/utils/validation';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import database from '@/database/index';

const filterSchema = object({
  from: timestampValidation.required(),
  name: nameValidation,
  to: timestampValidation.required()
});

type Filter = InferType<typeof filterSchema>;

const getAverage = async ({ daterange, filter }: { daterange: string, filter: Filter }) => {
  const query = (await database.$queryRaw(
    Prisma.sql`
      SELECT AVG(value) as average
      FROM (
        SELECT strftime(${daterange}, timestamp) as datetime, avg(value) as value, name
        FROM Metrics 
        WHERE name = ${filter.name} AND timestamp >= ${filter.from} AND timestamp <= ${filter.to} 
        GROUP BY datetime
      );
    `
  ));

  return get(query, '[0].average');
}

export default async (req: Request, res: Response): Promise<Response> => {
  let filter: Filter;

  try {
    filter = await filterSchema.validate(req.query, { abortEarly: false });
  } catch (error) {
    const validationError = error as ValidationError;
    const parsedErrors = parseValidationErrors(validationError);

    return res.status(400).json({ code: ERRORS.VALIDATION, error: parsedErrors });
  }

  try {
    const where = {
      name: {
        equals: filter.name
      },
      timestamp: {
        gte: filter.from,
        lte: filter.to
      }
    };
    const metrics = await database.metrics.findMany({
      where,
      orderBy: {
        timestamp: 'asc'
      }
    });
 
    const averageByMinutes = await getAverage({ daterange: '%Y-%m-%d %H:%M', filter });
    const averageByHours = await getAverage({ daterange: '%Y-%m-%d %H', filter });
    const averageByDays = await getAverage({ daterange: '%Y-%m-%d', filter });
    
    return res.json({
      data: {
        stats: {
          minutes: averageByMinutes,
          hours: averageByHours,
          days: averageByDays
        },
        metrics
      }
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ code: ERRORS.UNHANDLED });
  }
};
