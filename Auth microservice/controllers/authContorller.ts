import { Request, Response } from 'express';

export async function validateJwt(req: Request, res: Response) {
  res.status(200).send({
    msg: 'Your access token was successfully validated!',
  }); // if the token is not valid the 401 response will be sent by the checkjwt middleware
}
