import { Control, Controller } from 'react-hook-form';
import { isEmpty } from 'lodash';
import { Option, Select } from '@material-tailwind/react';

import React from 'react';

import type { ControllerRenderProps } from 'react-hook-form';

type MetricsSelectorProps = {
  [x: string]: any
  control: Control<any>
  label: string
  name: string
  options: string[]
}

const MetricsSelector: React.FC<MetricsSelectorProps> = ({ control, label, name, options = [] }) => {
  
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

  const handleChange = (onChange: Function, value: string) => {
    onChange({
      target: {
        name: name,
        value
      }
    });
  }

  console.log("options ", options);
  

  const renderSelect = ({ field: { onChange, value, ref } }: { field: ControllerRenderProps }) => {
    return (
      <Select
        disabled={ isEmpty(options) }
        label={ label }
        onChange={ value => handleChange(onChange, value as string) }
        ref={ ref }
        value={ value }
      >
        { options.map(renderMetricOption) }
      </Select>
    );
  }

  return (
    <Controller
      control={ control }
      name={ name }
      render={ renderSelect }
    />
  );
}

export default MetricsSelector;
