import { fetchTypes } from '@/store/reducers/types';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-tailwind/react';
import Navbar from '@/components/navbar';
import React, { useEffect } from 'react';
import store from '@/store';

const App: React.FC = () => {
  useEffect(() => {
    store.dispatch(fetchTypes());
  }, []);

  return (
    <ThemeProvider>
      <Provider store={ store }>
        <>
          <Navbar />
          
          <div className='container mx-auto my-4'>
            Body
          </div>
        </>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
