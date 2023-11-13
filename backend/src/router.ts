import { Router } from 'express';
import version from '@/controllers/version';

const router = Router();

router.get('/version', version);

export default router;
