import { ERRORS } from '@/utils/constants';
import { format } from 'date-fns';
import { InferType, number, object, string, ValidationError } from 'yup';
import { METRIC_TYPES } from '@/utils/constants';
import { parseValidationErrors } from '@/utils/validation';
import { Request, Response } from 'express';
import database from '@/database/index';

const dateRegexp = new RegExp(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
const metricTypes = Object.values(METRIC_TYPES);

const metricSchema = object({
  timestamp: string().matches(dateRegexp).default(() => format(new Date(), 'yyyy-MM-dd HH:mm:ss')),
  name: string().required().oneOf(metricTypes),
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
        value: metric.value,
      }
    });

    return res.status(201).json({ data: newMetric });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ code: ERRORS.UNHANDLED });
  }
};
