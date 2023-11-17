import { Input } from '@material-tailwind/react';
import React from 'react';

interface IDatepickerProps {
  ['data-testid']?: string;
  error?: boolean;
  formProps?: object;
  label?: string;
  required?: boolean;
}

const Datepicker: React.FC<IDatepickerProps> = ({ 'data-testid': dataTestid, error, formProps, label, required }) => {
  return (
    <Input
      { ...formProps }
      crossOrigin={ undefined }
      data-testid={ dataTestid }
      error={ error }
      label={ label }
      required={ required }
      step={ 1 }
      type='datetime-local'
    />
  );
}

export default Datepicker;
