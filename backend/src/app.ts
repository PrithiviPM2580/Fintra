import express, { type Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from './config/cors.config.js';
import globalErrorHandler from './middleware/global-error.middleware.js';
import routes from '@/routes/index.route.js';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(routes);

app.use(globalErrorHandler);

export default app;
