import { Request } from 'express';

export function getEmailFromJwt(req: Request): string {
  const user = JSON.parse(JSON.stringify(req.user));
  //domain name must be present but its not used
  const emailField: string = 'https://example.com/email'; // process.env.DOMAIN

  return user[emailField];
}
