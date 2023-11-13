import { Provider } from 'react-redux';
import React from 'react';
import store from '@/store';

const App: React.FC = () => {
  return (
    <Provider store={ store }>
      <div>
        <div className='app'>This is just a test</div>
      </div>
    </Provider>
  );
}

export default App;
