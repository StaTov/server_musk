import express, { RequestHandler } from 'express';
import { logOutAdmin, loginAdmin, regAdmin } from '../controllers/admin';



const router = express.Router();

router.post('/admin/login', loginAdmin as RequestHandler);
router.post('/admin/logout', logOutAdmin as RequestHandler);
router.post('/admin/reg', regAdmin as RequestHandler);


export default router;