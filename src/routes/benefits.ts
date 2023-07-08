import express, { RequestHandler } from 'express';
import { create, deleteBenefit, getAll } from '../controllers/benefits';
import { isAuthenticated } from '../middleware/isAuthenticated';

const router = express.Router();

router.get('/', getAll as RequestHandler);
router.post('/', isAuthenticated as RequestHandler, create as RequestHandler);
router.delete('/:id',isAuthenticated as RequestHandler, deleteBenefit as RequestHandler);

export default router;