import { fetchTypes } from '@/store/reducers/types';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-tailwind/react';
import Filterbar from '@/components/filterbar';
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
          
          <div className='lg:w-9/12 md:w-11/12 w-9/12 m-auto my-4'>
            <Filterbar />
          </div>
        </>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
