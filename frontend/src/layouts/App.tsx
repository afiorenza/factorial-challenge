import { fetchTypes } from '@/store/reducers/types';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-tailwind/react';
import Chart from '@/components/chart';
import Filterbar from '@/components/filterbar';
import Navbar from '@/components/navbar';
import React, { useEffect } from 'react';
import Stats from '@/components/stats';
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
            <div className='mb-4'>
              <Filterbar />
            </div>

            <div className='flex flex-col lg:flex-row lg:justify-between lg:space-x-6'>
              <div className='mb-4 lg:w-4/6 lg:mb-0'>
                <Chart />
              </div>
              <div className='mb-4 lg:w-2/6 lg:mb-0'>
                <Stats />
              </div>
            </div>
          </div>
        </>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
