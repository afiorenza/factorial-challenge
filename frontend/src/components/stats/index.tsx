import { Card, CardBody, List, ListItem, Typography } from '@material-tailwind/react';
import { isEmpty } from 'lodash';
import { selectStats } from '@/store/reducers/metrics';
import { useAppSelector } from '@/store/hooks';
import React from 'react';

const Stats: React.FC = () => {
  const stats = useAppSelector(selectStats);

  if (isEmpty(stats)) return null;

  return (
    <Card className='text-black'>
      <CardBody>
        <Typography className='font-bold'>Stats</Typography>

        <List>
          <ListItem>
            Days: { stats.days }
          </ListItem>
          <ListItem>
            Hours: { stats.hours }
          </ListItem>
          <ListItem>
            Minutes: { stats.minutes }
          </ListItem>
        </List>
      </CardBody>
    </Card>
  );
}

export default Stats;
