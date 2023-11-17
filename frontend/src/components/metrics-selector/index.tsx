import { Control, Controller } from 'react-hook-form';
import { isEmpty } from 'lodash';
import { Option, Select } from '@material-tailwind/react';
import { useAppSelector } from '@/store/hooks';
import React from 'react';

import type { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';

interface IMetricsSelectorProps {
  control: Control<any>;
  label: string;
  name: string;
  required?: boolean;
}

const MetricsSelector: React.FC<IMetricsSelectorProps> = ({ control, label, name, required }) => {
  const metricTypes = useAppSelector(state => state.types.types);

  const renderMetricOption = (option: string) => {
    return (
      <Option 
        key={ option } 
        value={ option }
      >
        { option }
      </Option>
    );
  };
  
  const renderSelect = ({ field: { onChange, value, ref }, fieldState: { error } }: { field: ControllerRenderProps, fieldState: ControllerFieldState  }) => {
    return (
      <Select
        error={ !isEmpty(error) }
        label={ label }
        onChange={ value => handleChange(onChange, value as string) }
        ref={ ref }
        value={ value }
      >
        { metricTypes.map(renderMetricOption) }
      </Select>
    );
  }

  const handleChange = (onChange: Function, value: string) => {
    onChange({
      target: {
        name: name,
        value
      }
    });
  }

  if (isEmpty(metricTypes)) {
    return (
      <Select disabled>
        <Option>Loading...</Option>
      </Select>
    );
  }

  return (
    <Controller
      control={ control }
      name={ name }
      render={ renderSelect }
      rules={ { required } }
    />
  );
}

export default MetricsSelector;
