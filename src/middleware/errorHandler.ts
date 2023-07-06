import { NextFunction, Request, Response } from 'express';


export const errorHandler = (err: unknown, _req: Request, res: Response, next: NextFunction) => {

    if (err instanceof Error) {
        res.status(400).send({ error: err.message });
    }
    next(err);
};