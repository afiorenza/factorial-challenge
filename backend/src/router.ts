import { Router } from 'express';
import addMetric from '@/controllers/metrics/add';
import retrieveMetrics from '@/controllers/metrics/retrieve';
import retrieveTypes from '@/controllers/types/retrieve';
import version from '@/controllers/version';

const router = Router();

router.get('/metrics', retrieveMetrics);
router.post('/metric', addMetric);

router.get('/types', retrieveTypes);

router.get('/version', version);

export default router;
