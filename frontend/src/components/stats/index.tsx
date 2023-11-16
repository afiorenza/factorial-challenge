import { Card, CardBody, Typography } from '@material-tailwind/react';
import React from 'react';

const Stats: React.FC = () => {
  return (
    <Card className='text-black'>
      <CardBody>
        <Typography className='font-bold'>Stats</Typography>
      </CardBody>
    </Card>
  );
}

export default Stats;
