import { Card, CardBody, List, ListItem, Typography } from '@material-tailwind/react';
import { every, isNull } from 'lodash';
import { selectStats } from '@/store/reducers/metrics';
import { useAppSelector } from '@/store/hooks';
import React from 'react';

const Stats: React.FC = () => {
  const stats = useAppSelector(selectStats);

  const renderItem = (type: string, value?: number) => {
    if (!value) return null;

    return (
      <ListItem>
        <Typography className='font-bold pr-2'>{ type }:</Typography> { value.toFixed(2) }
      </ListItem>
    )
  }

  if (every(stats, isNull)) return null;

  return (
    <Card className='text-black'>
      <CardBody>
        <Typography className='font-bold'>Average per</Typography>

        <List>
          { renderItem('Days', stats.days) }
          { renderItem('Hours', stats.hours) }
          { renderItem('Minutes', stats.minutes) }
        </List>
      </CardBody>
    </Card>
  );
}

export default Stats;
