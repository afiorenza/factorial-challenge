import { Input } from '@material-tailwind/react';
import React from 'react';

interface IDatepickerProps {
  [x: string]: any
  formProps?: object
  label?: string
  required?: boolean
}

const Datepicker: React.FC<IDatepickerProps> = ({ formProps, label, required, ...props }) => {
  return (
    <Input
      { ...props }
      { ...formProps }
      crossOrigin={ undefined }
      label={ label }
      required={ required }
      step={ 1 }
      type='datetime-local'
    />
  );
}

export default Datepicker;
