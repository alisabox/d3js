import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import messageRouter from './routes/messageRoutes';
import userRouter from './routes/userRoutes';
import stocksRouter from './routes/stocksRoutes';
import rapidApi from './utils/rapidApi';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

rapidApi();

app.use(compression());
app.use(helmet());

app.use(cors({ origin: ['http://localhost:4200'] }));
app.use('/api/v1/messages', messageRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/stocks', stocksRouter);

export default app;
