import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const Data: string | undefined = req.headers.authorization;
    const token: string | undefined = Data?.split(' ')[1];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const decoding: string | unknown = verify(
      token as string,
      process.env.JWT_SECRET as string
    );
  } catch (err) {
    res.status(401).json('' + err);
  }
  next();
};
