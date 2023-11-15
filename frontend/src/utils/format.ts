import { format } from 'date-fns';

export const formatDate = (date: string | Date): string => {
  return format(new Date(), 'yyyy-MM-dd HH:mm:ss');
} 
