import { ERRORS } from '@/utils/constants';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import database from '@/database/index';

interface Average {
  datetime: string
  value: number
}

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const metrics = await database.metrics.findMany();
    const averageByMinutes = await database.$queryRaw(
      Prisma.sql`SELECT strftime('%Y-%m-%d %H:%M', timestamp) as datetime, avg(value) as value FROM Metrics GROUP BY datetime;` // GROUP BY minutes ORDER BY minutes DESC
    ) as Array<Average>;
    const averageByHours = await database.$queryRaw(
      Prisma.sql`SELECT strftime('%Y-%m-%d %H', timestamp) as datetime, avg(value) as value FROM Metrics GROUP BY datetime;` // GROUP BY hours ORDER BY hours DESC
    ) as Array<Average>;
    const averageByDays = await database.$queryRaw(
      Prisma.sql`SELECT strftime('%Y-%m-%d', timestamp) as datetime, avg(value) as value FROM Metrics GROUP BY datetime;` // GROUP BY days ORDER BY days DESC
    ) as Array<Average>;

    return res.json({ 
      data: {
        stats: {
          minutes: averageByMinutes,
          hours: averageByHours,
          days: averageByDays
        },
        metrics
      } 
    });  
  } catch (error) {
    console.error(error);

    return res.status(500).json({ code: ERRORS.UNHANDLED });
  }
};
