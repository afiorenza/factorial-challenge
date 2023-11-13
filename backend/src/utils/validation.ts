import { ValidationError } from 'yup';

export const parseValidationErrors = (error: ValidationError): {} => {
  const parsedErrors = error.inner.reduce((errors, innerError) => {
    return {
      ...errors,
      [innerError.path as string]: innerError.errors
    } 
  }, {});

  return parsedErrors;
}
