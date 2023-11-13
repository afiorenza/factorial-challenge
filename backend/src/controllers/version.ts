import { Request, Response } from 'express';
import { version } from '../../package.json';

export default (req: Request, res: Response): Response => {
  return res.json({ version });
};
