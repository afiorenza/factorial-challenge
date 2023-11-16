import { Card, CardBody, Typography } from '@material-tailwind/react';
import React from 'react';

const Chart: React.FC = () => {
  return (
    <Card className='text-black'>
      <CardBody>
        <Typography className='font-bold'>Chart</Typography>
      </CardBody>
    </Card>
  );
}

export default Chart;
