import { fireEvent, screen } from '@testing-library/react';
import { mockAnimationsApi } from 'jsdom-testing-mocks';
import { renderWithProviders } from '@test/store-setup';
import AddMetricForm from '@/components/add-metric/form';
import userEvent from '@testing-library/user-event';

mockAnimationsApi();

test('should submit valid format', async () => {
  const onSubmit = vi.fn();
  const user = userEvent.setup();
  const formData = {
    name: 'TEMPERATURE',
    timestamp: '2023-12-15 13:30:59',
    value: '12.23'
  }

  renderWithProviders(<AddMetricForm onSubmit={ onSubmit } />);
  
  await user.clear(screen.getByTestId('input-timestamp'));
  await user.type(screen.getByTestId('input-timestamp'), formData.timestamp);
  await user.selectOptions(screen.getByTestId('input-name'), [formData.name]);
  await user.type(screen.getByTestId('input-value'), formData.value);
  await user.type(screen.getByTestId('input-value'), '{enter}');

  expect(onSubmit).toHaveBeenCalledWith(formData);
});

test('should submit invalid format', async () => {
  const onSubmit = vi.fn();

  renderWithProviders(<AddMetricForm onSubmit={ onSubmit } />);

  fireEvent.submit(screen.getByTestId('button-submit'))

  expect(onSubmit).not.toHaveBeenCalled();
});
