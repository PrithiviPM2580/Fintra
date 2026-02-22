import express, { type Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from './config/cors.config.js';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

export default app;
