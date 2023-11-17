import { fetchMetrics, FilterAttributes, selectLoadingMetrics } from '@/store/reducers/metrics';
import { Button, Card, CardBody } from '@material-tailwind/react';
import { formatDate } from '@/utils/format';
import { isEmpty } from 'lodash';
import { subDays } from 'date-fns';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useForm } from 'react-hook-form';
import Datepicker from '@/components/datepicker';
import MetricsSelector from '@/components/metrics-selector';
import React, { useState } from 'react';

import type { IFilter } from '@/store/reducers/metrics';

interface Error {
  type: string;
  message: string;
}

interface IErrors {
  [FilterAttributes.from]?: Error;
  [FilterAttributes.name]?: Error;
  [FilterAttributes.to]?: Error;
}

const Filterbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoadingMetrics = useAppSelector(selectLoadingMetrics);
  const { handleSubmit, register } = useForm<IFilter>({
    defaultValues: { 
      name: '',
      from: formatDate(subDays(new Date(), 7)),
      to: formatDate(new Date())
    }
  });
  const [errors, setErrors] = useState<IErrors>({});

  const handleValidSubmit = (formData: IFilter) => {
    dispatch(fetchMetrics({
      ...formData,
      from: formatDate(new Date(formData.from)),
      to: formatDate(new Date(formData.to)),
    }));
  }

  const handleInvalidSubmit = (errors: any) => {
    setErrors(errors as IErrors);  
  }

  return (
    <Card className='w-full'>
      <CardBody>
        <form 
          onSubmit={ handleSubmit(handleValidSubmit, handleInvalidSubmit) }
        >
          <div className='flex flex-col lg:flex-row lg:justify-between lg:space-x-4'>
            <div className='mb-4 lg:w-1/4 lg:mb-0'>
              <MetricsSelector
                data-testid='input-name'
                formProps={ register(FilterAttributes.name, { required: true }) }
              />
            </div>
            
            <div className='mb-4 lg:w-1/4 lg:mb-0'>
              <Datepicker
                formProps={ register(FilterAttributes.from, { required: true }) }
                error={ !isEmpty(errors[FilterAttributes.from]) }
                label='From'
                required
              />
            </div>

            <div className='mb-4 lg:w-1/4 lg:mb-0'>
              <Datepicker
                formProps={ register(FilterAttributes.to, { required: true }) }
                error={ !isEmpty(errors[FilterAttributes.to]) }
                label='To'
                required
              />
            </div>

            <Button 
              disabled={ isLoadingMetrics }
              type='submit'
            >
              Filter
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

export default Filterbar;
