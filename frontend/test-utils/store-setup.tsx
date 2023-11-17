import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import store from '@/store';

export const renderWithProviders = (ui: React.ReactElement, renderOptions?: any) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={ store }>
        { children }
      </Provider>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
