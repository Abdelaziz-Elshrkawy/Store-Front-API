import { userMethods, userData } from '../models/usersmodel';
import Express, { Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import { authToken } from './authorization';

const users = new userMethods();

const indexUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const index = await users.index();
    res.status(200);
    res.json(index);
  } catch (err) {
    //solving conflict of sending two responses while token absence
    if (!res.json()) {
      res.status(400).json('' + err);
    }
  }
};
const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: userData = {
      firstname: req.body.firstname as string,
      lastname: req.body.lastname as string,
      hashed_password: req.body.password as string,
    };
    const newUser = await users.create(data);
    const token = Jwt.sign({ newUser }, process.env.JWT_SECRET as string);
    res.status(201);
    res.json(token);
  } catch (err) {
    res.status(400).json('' + err);
  }
};
const showUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const showUser = await users.show(req.params.id);
    res.status(200);
    res.json(showUser);
  } catch (err) {
    //solving conflict of sending two responses while token absence
    if (!res.json()) {
      res.status(400).json('' + err);
    }
  }
};

const authUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (
      await users.authentication(
        req.body.firstname as string,
        req.body.lastname as string,
        req.body.password as string
      )
    ) {
      res.status(200).json('login success');
    } else res.status(400).json('login failed');
  } catch (err) {
    res.json('' + err);
  }
};
export const userRoute = async (app: Express.Application): Promise<void> => {
  app.get('/user', authToken, indexUser);
  app.get('/user/:id', authToken, showUser);
  app.post('/user', createUser);
  app.get('/login', authUser);
};
