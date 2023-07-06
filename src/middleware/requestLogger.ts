import logger from '../utils/logger';
import {Request, Response, NextFunction} from 'express';

export const requestLogger = (req: Request, _res: Response, next: NextFunction): void => {
    logger.info('Method: ', req.method);
    logger.info('Url: ', req.url);
    logger.info('Body: ', req.body);
    logger.info('Cookie: ', req.cookies);
    logger.info('---');
    next();
};