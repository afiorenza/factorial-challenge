import { ERRORS } from '@/utils/constants';
import { METRIC_TYPES } from '@/utils/constants';
import { Request, Response } from 'express';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    return res.json({ 
      data: Object.values(METRIC_TYPES)
    });  
  } catch (error) {
    console.error(error);

    return res.status(500).json({ code: ERRORS.UNHANDLED });
  }
};
