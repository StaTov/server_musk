import express, { RequestHandler } from 'express';
import { create, deleteBenefit, getAll } from '../controllers/benefits';

const router = express.Router();

router.get('/', getAll as RequestHandler);
router.post('/', create as RequestHandler);
router.delete('/:id', deleteBenefit as RequestHandler);

export default router;