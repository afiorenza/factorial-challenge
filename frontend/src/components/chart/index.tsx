import { Card, CardBody, Typography } from '@material-tailwind/react';
import { isEmpty } from 'lodash';
import { selectMetrics } from '@/store/reducers/metrics';
import { useAppSelector } from '@/store/hooks';
import React from 'react';


const Chart: React.FC = () => {
  const metrics = useAppSelector(selectMetrics);

  if (isEmpty(metrics)) return null;

  return (
    <Card className='text-black'>
      <CardBody>
        <Typography className='font-bold'>Chart</Typography>
      </CardBody>
    </Card>
  );
}

export default Chart;
