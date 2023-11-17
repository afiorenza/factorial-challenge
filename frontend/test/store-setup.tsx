import { get } from 'lodash';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { setupStore } from '@/store';
import React, { PropsWithChildren } from 'react';

export const renderWithProviders = (ui: React.ReactElement, renderOptions?: any) => {
  const preloadedState = get(renderOptions, 'preloadedState', {});
  const store = setupStore({
    types: {
      types: ['HUMIDITY', 'TEMPERATURE']
    },
    ...preloadedState
  });

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={ store }>
        { children }
      </Provider>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
