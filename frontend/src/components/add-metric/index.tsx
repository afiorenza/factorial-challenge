import { addMetric } from '@/store/reducers/metrics';
import { Button, Dialog, DialogHeader, DialogBody } from '@material-tailwind/react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import AddMetricForm from '@/components/add-metric/form';
import React, { useState } from 'react';

import type { Metric } from '@/store/reducers/metrics';

const AddMetric: React.FC = () => {
  const { adding } = useAppSelector(state => state.metrics);
  const dispatch = useAppDispatch();

  const [isOpen, setOpen]= useState<boolean>(false);

  const setModalOpen = (isOpen: boolean) => setOpen(isOpen);

  const handleSubmit = async (metric: Metric) => {
    await dispatch(addMetric(metric));

    setModalOpen(false);
  }

  const renderTrigger = () => {
    return (
      <Button onClick={ () => setModalOpen(true) } variant='text'>
        Add new metric
      </Button>
    );
  }

  const renderModal = () => {
    return (
      <Dialog 
        handler={ setModalOpen }
        open={ isOpen }
      >
        <DialogHeader>Add metric</DialogHeader>

        <DialogBody>
          <AddMetricForm
            adding={ adding }
            onSubmit={ handleSubmit }
          />
        </DialogBody>
      </Dialog>
    );
  }

  return (
    <>
      { renderTrigger() }
      { renderModal() }
    </>
  );
}

export default AddMetric;
