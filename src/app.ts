import express from 'express';
import cors from 'cors';
import { requestLogger } from './middleware/requestLogger';
import { unknownEndPoint } from './middleware/unknownEndPoint';
import logger from './utils/logger';
import config from './utils/config';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/errorHandler';
import BenefitsRouter from './routes/benefits';
import authRouter from './routes/auth';
import cookieParser from 'cookie-parser';
import path from 'path';


const app = express();

logger.info('connecting to MongoDB');

const URI = config.MONGODB_URI || 'missing url';

mongoose.connect(URI)
    .then(() => {
        logger.info('connected to MongoDB');
    })
    .catch((error: unknown) => {
        if (error instanceof Error) {
            logger.error('error connecting to MongoDB:', error.message);
        }
    });

app.use(express.static('build'));
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);

app.use('/benefits', BenefitsRouter);
app.use('/auth/', authRouter);
app.use(errorHandler);


app.use((_req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
app.use(unknownEndPoint);

export default app;