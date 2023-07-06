import { Request, Response } from 'express';

export const unknownEndPoint = (_req: Request, res: Response) => {
    res.status(404).send({ error: 'unknown endpoint' });
};