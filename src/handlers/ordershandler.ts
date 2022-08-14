import {
  orderData,
  ordersMethods,
  order_productData,
} from '../models/orderesmodel';
import Express, { Request, Response } from 'express';
import { authToken } from './authorization';

const order = new ordersMethods();

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: orderData = {
      user_id: req.params.id as string | number,
      status: req.body.status as string,
    };
    const create = await order.create(data);
    res.status(200).json(create);
  } catch (err) {
    //solving conflict of sending two responses while token absence
    if (!res.json()) {
      res.status(400).json('' + err);
    }
  }
};

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const index = await order.index(req.body.user_id as string);
    res.status(200).json(index);
  } catch (err) {
    //solving conflict of sending two responses while token absence
    if (!res.json()) {
      res.status(400).json('' + err);
    }
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const show = await order.show(
      req.params.user_id as string | number,
      req.params.order_id as string | number
    );
    res.status(200).json(show);
  } catch (err) {
    //solving conflict of sending two responses while token absence
    if (!res.json()) {
      res.status(400).json('' + err);
    }
  }
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: order_productData = {
      product_id: req.body.product_id as string | number,
      quantity: req.body.quantity as string | number,
      order_id: req.params.id as string | number,
    };
    const addProduct = await order.addProduct(data);
    res.status(200).json(addProduct);
  } catch (err) {
    //solving conflict of sending two responses while token absence
    if (!res.json()) {
      res.status(400).json('' + err);
    }
  }
};

const orderConfirmation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const confirm = await order.orderConfirmation(
      req.body.order_id as string | number,
      req.params.id as string | number
    );
    res.status(200).json('order confirmed');
  } catch (err) {
    //solving conflict of sending two responses while token absence
    if (!res.json()) {
      res.status(400).json('' + err);
    }
  }
};

export const ordersRoute = async (app: Express.Application): Promise<void> => {
  app.post('/order/user/:id', authToken, create);
  app.get('/order', authToken, index);
  app.get('/order/:order_id/user/:user_id', authToken, show);
  app.post('/order/:id/product', authToken, addProduct);
  app.put('/order/user/:id', authToken, orderConfirmation);
};
