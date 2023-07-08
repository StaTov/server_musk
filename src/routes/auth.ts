import express, { RequestHandler } from 'express';
import { loginAdmin, regAdmin } from '../controllers/admin';


const router = express.Router();

router.post('/admin/login', loginAdmin as RequestHandler);
router.post('/admin/reg', regAdmin as RequestHandler);


export default router;