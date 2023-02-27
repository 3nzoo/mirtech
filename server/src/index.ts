import express, { Express, Request, Response } from 'express';
import { routes } from './routes';
import cors from 'cors';
const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

routes(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export { app };
