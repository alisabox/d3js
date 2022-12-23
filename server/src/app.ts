import express from 'express';
import morgan from 'morgan';
import messageRouter from './routes/messageRoutes';
import userRouter from './routes/userRoutes';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/messages', messageRouter);
app.use('/api/v1/users', userRouter);

export default app;
