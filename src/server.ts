import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { userRoute } from './handlers/userhandler';
import { productsRoute } from './handlers/productshandler';
import { ordersRoute } from './handlers/ordershandler';
import cors from 'cors';

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Hello World!');
});

userRoute(app);
productsRoute(app);
ordersRoute(app);

app.listen(port, () => {
  console.log(`starting app on: ${port}`);
});

export default app;
