import { METRIC_TYPES } from '@/utils/constants';
import { string, ValidationError } from 'yup';

const dateRegexp = new RegExp(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
const metricTypes = Object.values(METRIC_TYPES);

export const parseValidationErrors = (error: ValidationError): Record<string, Record<string, string[]>> => {
  const parsedErrors = error.inner.reduce((errors, innerError) => {
    return {
      ...errors,
      [innerError.path as string]: innerError.errors
    };
  }, {});

  return parsedErrors;
};

export const nameValidation = string().required().oneOf(metricTypes);

export const timestampValidation = string().matches(dateRegexp);
