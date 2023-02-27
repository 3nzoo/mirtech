import { Request, Response } from 'express';
import { iUser } from '../interfaces';
import { users } from '../dummy.data';

export const getUsers = (req: Request, res: Response) => {
  const result: iUser[] = users;
  console.log(result);
  res.send(result);
};
