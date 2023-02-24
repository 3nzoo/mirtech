import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = process.env.PORT || 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
