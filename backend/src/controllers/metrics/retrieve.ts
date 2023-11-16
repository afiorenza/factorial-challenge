import { ERRORS } from '@/utils/constants';
import { InferType, number, object, ValidationError } from 'yup';
import { nameValidation, parseValidationErrors, timestampValidation } from '@/utils/validation';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import database from '@/database/index';

interface IAverage {
  datetime: string;
  value: number;
}

const filterSchema = object({
  from: timestampValidation.required(),
  name: nameValidation,
  to: timestampValidation.required()
});

type Filter = InferType<typeof filterSchema>;

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

    // const average = await database.metrics.aggregate({
    //   select: {
    //     [`strftime('%Y-%m-%d %H:%M', timestamp)`:] 'datetime'
    //   },
    //   _avg: {
    //     value: true
    //   },
    //   where
    // });

    const averageByMinutes = (await database.$queryRaw(
      Prisma.sql`SELECT strftime('%Y-%m-%d %H:%M', timestamp) as datetime, avg(value) as value FROM Metrics GROUP BY datetime;` // GROUP BY minutes ORDER BY minutes DESC
    )) as Array<IAverage>;
    const averageByHours = (await database.$queryRaw(
      Prisma.sql`SELECT strftime('%Y-%m-%d %H', timestamp) as datetime, avg(value) as value FROM Metrics GROUP BY datetime;` // GROUP BY hours ORDER BY hours DESC
    )) as Array<IAverage>;
    const averageByDays = (await database.$queryRaw(
      Prisma.sql`SELECT strftime('%Y-%m-%d', timestamp) as datetime, avg(value) as value FROM Metrics GROUP BY datetime;` // GROUP BY days ORDER BY days DESC
    )) as Array<IAverage>;

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
