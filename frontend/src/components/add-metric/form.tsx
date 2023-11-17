import { Button, Card, Input } from '@material-tailwind/react';
import { formatDate } from '@/utils/format';
import { isEmpty } from 'lodash';
import { MetricAttributes } from '@/store/reducers/metrics';
import { useForm } from 'react-hook-form';
import Datepicker from '@/components/datepicker';
import MetricsSelector from '@/components/metrics-selector';
import React, { useState } from 'react';

import type { Metric } from '@/store/reducers/metrics';

interface Error {
  type: string;
  message: string;
}

interface IErrors {
  [MetricAttributes.name]?: Error;
  [MetricAttributes.timestamp]?: Error;
  [MetricAttributes.value]?: Error;
}

interface IAddMetricForm {
  adding?: boolean;
  onSubmit: Function;
}

const AddMetricForm: React.FC<IAddMetricForm> = ({ adding, onSubmit }) => {
  const { handleSubmit, register, reset } = useForm<Metric>({
    defaultValues: { 
      name: '',
      timestamp: formatDate(new Date()),
      value: undefined
    }
  });
  const [errors, setErrors] = useState<IErrors>({});
  
  const handleValidSubmit = (formData: Metric) => {
    onSubmit({
      ...formData,
      timestamp: formatDate(new Date(formData.timestamp))
    });
    reset();
  }

  const handleInvalidSubmit = (errors: any) => {
    setErrors(errors as IErrors);  
  }

  return (
    <Card>
      <form 
        className='p-5'
        data-testid='form'
        onSubmit={ handleSubmit(handleValidSubmit, handleInvalidSubmit) }
      >
        <div className='mb-2'>
          <Datepicker 
            data-testid='input-timestamp'
            error={ !!errors[MetricAttributes.timestamp] }
            formProps={ register(MetricAttributes.timestamp, { required: true }) }
            label='Date'
            required
          />
        </div>

        <div className='mb-4'>
          <MetricsSelector 
            data-testid='input-name'
            formProps={ register(MetricAttributes.name, { required: true }) }
          />
        </div>
        
        <div className='mb-4'>
          <Input
            { ...register(MetricAttributes.value, { required: true }) } 
            crossOrigin={ undefined }
            data-testid='input-value'
            error={ !isEmpty(errors[MetricAttributes.value]) }
            label='Value'
            step={ 0.01 }
            type='number'
            required
          />
        </div>

        <div className='flex justify-end mx-4'>
          <Button 
            data-testid='button-submit'
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
