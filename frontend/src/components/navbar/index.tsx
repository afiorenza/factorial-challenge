import { Navbar as MtNavbar, Typography } from '@material-tailwind/react';
import AddMetric from '@/components/add-metric';
import React from 'react';
 
 const Navbar: React.FC = () => {
  return (
    <MtNavbar className='' fullWidth>
      <div className='container mx-auto flex items-center justify-between text-black'>
        <Typography className='font-bold'>
          Factorial challenge
        </Typography> 

        <div>
          <AddMetric />
        </div>
      </div>
    </MtNavbar>
  );
}

export default Navbar;
