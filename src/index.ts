import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import BoardRouter from './routes/boardRouter'
import TaskRouter from './routes/taskRouter'

const app: Application = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())

app.use('/board', BoardRouter)
app.use('/task', TaskRouter)


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Express!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});