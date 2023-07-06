import express from 'express';
import cors from 'cors';
import { requestLogger } from './middleware/requestLogger';
import { unknownEndPoint } from './middleware/unknownEndPoint';
import logger from './utils/logger';
import config from './utils/config';
import mongoose from 'mongoose';

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

app.use(cors({ credentials: true }));
app.use(express.json());

app.use(requestLogger);

app.use(unknownEndPoint);

export default app;