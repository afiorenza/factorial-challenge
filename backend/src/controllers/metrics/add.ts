import { ERRORS, TIMESTAMP_FORMAT } from '@/utils/constants';
import { format } from 'date-fns';
import { InferType, number, object, ValidationError } from 'yup';
import { nameValidation, parseValidationErrors, timestampValidation } from '@/utils/validation';
import { Request, Response } from 'express';
import database from '@/database/index';

const metricSchema = object({
  timestamp: timestampValidation.default(() => format(new Date(), TIMESTAMP_FORMAT)),
  name: nameValidation,
  value: number().required()
});

type Metric = InferType<typeof metricSchema>;

export default async (req: Request, res: Response): Promise<Response> => {
  let metric: Metric;

  try {
    metric = await metricSchema.validate(req.body, { abortEarly: false });
  } catch (error) {
    const validationError = error as ValidationError;
    const parsedErrors = parseValidationErrors(validationError);

    return res.status(400).json({ code: ERRORS.VALIDATION, error: parsedErrors });
  }

  try {
    const newMetric = await database.metrics.create({
      data: {
        timestamp: metric.timestamp,
        name: metric.name,
        value: metric.value
      }
    });

    return res.status(201).json({ data: newMetric });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ code: ERRORS.UNHANDLED });
  }
};
