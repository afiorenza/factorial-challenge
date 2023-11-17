import { useAppSelector } from '@/store/hooks';
import React from 'react';

interface IMetricsSelectorProps {
  ['data-testid']?: string;
  formProps?: object;
}

const MetricsSelector: React.FC<IMetricsSelectorProps> = ({ 'data-testid': dataTestid, formProps }) => {
  const metricTypes = useAppSelector(state => state.types.types);

  const renderMetricOption = (option: string) => {
    return (
      <option 
        key={ option } 
        value={ option }
      >
        { option }
      </option>
    );
  };

  return (
    <select 
      { ...formProps }
      className='peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900'
      data-testid={ dataTestid }
    >
      <option value=''>Select type</option>
      { metricTypes.map(renderMetricOption) }
    </select>
  )
}

export default MetricsSelector;
