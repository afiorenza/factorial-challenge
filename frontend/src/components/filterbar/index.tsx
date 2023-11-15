import { Button, Card, CardBody } from '@material-tailwind/react';
import { formatDate } from '@/utils/format';
import { subDays } from 'date-fns';
import { useForm } from 'react-hook-form';
import Datepicker from '@/components/datepicker';
import MetricsSelector from '@/components/metrics-selector';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';

enum IFilterAttributes {
  from = 'from',
  name = 'name',
  to = 'to'
}

interface Error {
  type: string
  message: string
}

interface IErrors {
  [IFilterAttributes.from]?: Error
  [IFilterAttributes.name]?: Error
  [IFilterAttributes.to]?: Error
}

interface IFilter {
  [IFilterAttributes.from]: string
  [IFilterAttributes.name]: string
  [IFilterAttributes.to]: string
}

const Filterbar: React.FC = () => {
  const loadingTypes = useAppSelector(state => state.types.loading);
  const metricTypes = useAppSelector(state => state.types.types);

console.log( "loadingTypes ", loadingTypes);

  useEffect(() => {
    console.log("loadingTypes ", loadingTypes);
    
  }, [loadingTypes]);

  const { control, handleSubmit, register } = useForm<IFilter>({
    defaultValues: { 
      name: '',
      from: formatDate(subDays(new Date(), 7)),
      to: formatDate(new Date())
    }
  });
  const [errors, setErrors] = useState<IErrors>({});

  const handleValidSubmit = (formData: IFilter) => {
    // onSubmit({
    //   ...formData,
    //   timestamp: formatDate(formData.timestamp as string)
    // });
    // reset();
  }

  const handleInvalidSubmit = (errors: any) => {
    setErrors(errors);  
  }

  return (
    <Card className='w-full'>
      <CardBody>
        <form 
          onSubmit={ handleSubmit(handleValidSubmit, handleInvalidSubmit) }
        >
          <div className='flex flex-col lg:flex-row lg:justify-between lg:space-x-4'>
            <div className='mb-4 lg:w-1/4'>
              <MetricsSelector
                control={ control }
                label='Metric type' 
                name={ IFilterAttributes.name }
                options={ metricTypes }
              />
            </div>
            
            <div className='mb-4 lg:w-1/4'>
              <Datepicker
                formProps={ register(IFilterAttributes.from, { required: true }) }
                error={ !!errors[IFilterAttributes.from] }
                label='From'
                required
              />
            </div>

            <div className='mb-4 lg:w-1/4'>
              <Datepicker
                formProps={ register(IFilterAttributes.to, { required: true }) }
                error={ !!errors[IFilterAttributes.to] }
                label='To'
                required
              />
            </div>

            <div className=''> 
              <Button>
                Filter
              </Button>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

export default Filterbar;
