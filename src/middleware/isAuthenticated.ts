import {Request, Response, NextFunction} from 'express';
import { getAdminBySessionToken } from '../models/adminModel';
import { toToken } from '../utils/checkType';
import { merge } from 'lodash';


export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = toToken(req.cookies['MUSK-AUTH']);

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingAdmin = await getAdminBySessionToken(sessionToken);

        if (!existingAdmin) {
            return res.sendStatus(403);
        }

        merge(req, { identity: existingAdmin });

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};