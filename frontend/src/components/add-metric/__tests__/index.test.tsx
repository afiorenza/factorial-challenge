import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '@test-utils/store-setup';
import AddMetric from '@/components/add-metric';

test('should open form modal on trigger click', () => {
  renderWithProviders(<AddMetric />)

  const trigger = screen.getByText('Add new metric');

  fireEvent.click(trigger);

  expect(screen.getByTestId('form-modal')).toBeTruthy();
});

test('should dispatch and close modal', () => {
  const asd = renderWithProviders(<AddMetric />)

  console.log(asd);
  
});
