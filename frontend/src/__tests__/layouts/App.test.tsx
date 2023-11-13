import { render } from '@testing-library/react';
import App from '@/layouts/App.tsx';

describe('App Component', () => {
  it('should render the correct text', () => {
    const { container } = render(<App />);

    expect(container.textContent).toBe('This is just a test');
  });
});
