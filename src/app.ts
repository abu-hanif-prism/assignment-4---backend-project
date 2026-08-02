import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Application, type Request, type Response } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import notFound from './middlewares/notFound.js';
import router from './routes/index.js';

const app: Application = express();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/v1', router);

app.use(notFound);
app.use(globalErrorHandler);

export default app;