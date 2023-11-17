import { Card, CardBody, Typography } from '@material-tailwind/react';
import { isEmpty } from 'lodash';
import { selectFiltered, selectMetrics, selectMetricsName } from '@/store/reducers/metrics';
import { useAppSelector } from '@/store/hooks';
import ApexCharts from 'react-apexcharts';
import React from 'react';

const Chart: React.FC = () => {
  const hasFiltered = useAppSelector(selectFiltered)
  const metrics = useAppSelector(selectMetrics);
  const name = useAppSelector(selectMetricsName);

  if (isEmpty(metrics) && hasFiltered) {
    return (
      <Card>
        <CardBody>
          <Typography color='red'>
            There are not data for the selected filters.
          </Typography>
        </CardBody>
      </Card>
    )
  };
  
  if (isEmpty(metrics)) return null;

  return (
    <Card className='text-black'>
      <CardBody>
        <Typography className='font-bold'>Chart</Typography>

        <ApexCharts 
          height={ 300 } 
          options={ { xaxis: { type: 'datetime' }} } 
          series={ [{ name, data: metrics }] } 
          type='line'  
        />
      </CardBody>
    </Card>
  );
}

export default Chart;
