import { Button, Card, Input, Option, Select } from '@material-tailwind/react';
import { formatDate } from '@/utils/format';
import { useAppSelector } from '@/store/hooks';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';

import type { Metric } from '@/store/reducers/metrics';
import type { onChange } from '@material-tailwind/react/types/components/select';

enum MetricAttributes {
  name = 'name',
  timestamp = 'timestamp',
  value = 'value'
}

interface Error {
  type: string
  message: string
}

interface IErrors {
  [MetricAttributes.name]?: Error
  [MetricAttributes.timestamp]?: Error
  [MetricAttributes.value]?: Error
}

interface IAddMetricForm {
  adding: boolean
  onSubmit: Function
}

const AddMetricForm: React.FC<IAddMetricForm> = ({ adding, onSubmit }) => {
  const metricTypes = useAppSelector(state => state.types.types);
  const { handleSubmit: handleSubmit, register, reset, setValue } = useForm<Metric>({
    defaultValues: { 
      name: '',
      timestamp: formatDate(new Date()),
      value: ''
    }
  });
  const [errors, setErrors] = useState<IErrors>({});

  const handleValidSubmit = (formData: Metric) => {
    onSubmit({
      ...formData,
      timestamp: formatDate(formData.timestamp as string)
    });
    reset();
  }

  const handleInvalidSubmit = (errors: any) => {
    setErrors(errors);  
  }

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

  const renderNameSelect = () => {
    const props = register(MetricAttributes.name, { 
      required: true 
    });
    const handleChange: onChange = (value) => setValue(props.name, value as string);

    return (
      <Select 
        { ...props }
        label='Metric type'
        onChange={ handleChange }
      >
        { metricTypes.map(renderMetricOption) }
      </Select>
    );
  } 

  return (
    <Card>
      <form 
        className='p-5'
        onSubmit={ handleSubmit(handleValidSubmit, handleInvalidSubmit) }
      >
        <div className='mb-2'>
          <Input
            { 
              ...register(MetricAttributes.timestamp, {
                required: true,
              }) 
            } 
            crossOrigin={ undefined }
            error={!!errors[MetricAttributes.timestamp]}
            label='Date'
            required
            step={ 1 }
            type='datetime-local'
          />
        </div>

        <div className='mb-4'>
          { renderNameSelect() }
        </div>
        
        <div className='mb-4'>
          <Input
            { 
              ...register(MetricAttributes.value, { 
                required: true 
              }) 
            } 
            crossOrigin={ undefined }
            error={!!errors[MetricAttributes.value]}
            label='Value'
            step={ 0.01 }
            type='number'
            required
          />
        </div>

        <div className='flex justify-end mx-4'>
          <Button 
            disabled={ adding } 
            type='submit'
          >
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default AddMetricForm;
