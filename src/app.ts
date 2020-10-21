import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
// tslint:disable-next-line: no-import-side-effect
import 'reflect-metadata';
import { database } from './initializers';
import route from './routes';
import morgan from 'morgan';
// tslint:disable-next-line: no-floating-promises
database.create();

const app = express();

app.set('port', process.env.SERVER_PORT || 3001);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.disable('x-powered-by');

app.use(route);
export default app;
