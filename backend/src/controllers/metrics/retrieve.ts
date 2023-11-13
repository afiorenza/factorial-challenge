import { ERRORS } from '@/utils/constants';
import { Request, Response } from 'express';
import database from '@/database/index';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const metrics = await database.metrics.findMany();

    return res.json({ data: metrics });  
  } catch (error) {
    console.error(error);

    return res.status(500).json({ code: ERRORS.UNHANDLED });
  }
};
