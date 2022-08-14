import { productData, productMethods } from '../models/productsmodel';
import Express, { Request, Response } from 'express';
import { authToken } from './authorization';

const p = new productMethods();

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: productData = {
      name: req.body.name as string,
      price: req.body.price as string | number,
    };
    const create = await p.create(product);
    res.status(201);
    res.json(create);
  } catch (err) {
    //solving confilct of sending two responses while token absence
    if (!res.json()) {
      res.status(400).json('' + err);
    }
  }
};
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const index = await p.index();
    res.status(200);
    res.json(index);
  } catch (err) {
    res.status(400);
    res.json('' + err);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const show = await p.show(req.params.id as string | number);
    res.json(show);
  } catch (err) {
    res.status(400);
    res.json('' + err);
  }
};

export const productsRoute = async (
  app: Express.Application
): Promise<void> => {
  app.post('/product', authToken, create);
  app.get('/product', index);
  app.get('/product/:id', show);
};
