import { createAdmin, getAdminByEmail } from '../models/adminModel';
import { toLoginAdmin } from '../utils/checkType';
import { Response, Request, NextFunction } from 'express';
import bcrypt from 'bcrypt';

//authentication
export const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = toLoginAdmin(req.body);

        const existAdmin = await getAdminByEmail(email).select('+password');
        if (!existAdmin) {
            res.status(404).send({ error: 'wrong email' });
            return;
        }
        const existPWD = await bcrypt.compare(password, existAdmin.password);
        if (!existPWD) {
            res.status(404).send({ error: 'wrong password' });
            return;
        }
        existAdmin.token = await bcrypt.hash(existAdmin._id.toString(), 10);
        await existAdmin.save();

        res.cookie('MUSK-AUTH', existAdmin.token, {
            httpOnly: true,
            domain: 'musk-server-demo.onrender.com',
            path: '/'
        });
        res.status(200).json({ admin: true });

    } catch (err) {
        next(err);
    }
};

export const logOutAdmin = (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie('MUSK-AUTH', 'none', {
            expires: new Date(Date.now() + 5 * 1000),
            httpOnly: true,
            domain: 'musk-server-demo.onrender.com',
            path: '/'
        });
        res.status(200).send('admin logout successully');
    } catch (err) {
        next(err);
    }
};
//create new admin
export const regAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = toLoginAdmin(req.body);
        //hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        // save and send
        const savedAdmin = await createAdmin({ email, password: passwordHash });
        res.status(201).json(savedAdmin);
    } catch (err) {
        next(err);
    }
};