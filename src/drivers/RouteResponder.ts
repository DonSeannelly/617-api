import { Responder } from '../interfaces';
import { Response } from 'express';

import * as dotenv from 'dotenv';
dotenv.config()


export default class RouteResponder implements Responder {
  /**
   *
   * @param res
   */
  constructor(private res: Response) {}

  /**
   *
   */
  sendOperationSuccess() {
    this.res.sendStatus(200);
  }

  /**
   *
   * @param message
   * @param status
   */
  sendOperationError(message: string, status?: number): void {
    message && status
      ? this.res.status(status).send(message)
      : message && !status
        ? this.res.status(400).send(message)
        : !message && status
          ? this.res.status(status).send('Server error encountered.')
          : this.res.status(400).send('Server error encountered.');
  }

  /**

   *
   */
  invalidLogin() {
    this.res.status(400).json({ message: 'Invalid Username or Password' });
  }

  /**
   *
   */
  invalidRegistration() {
    this.res.status(400).send('Invalid registration credentials');
  }

  /**
   *
   */
  invalidAccess() {
    this.res.status(401).send('Invalid access token');
  }

  setCookie(key: string, value: string) {
    let options = {
      maxAge: 604800000,
      httpOnly: false,
      domain: process.env.COOKIE_DOMAIN,
      secure: process.env.NODE_ENV !== 'development'
    };

    this.res.cookie(key, value, options).sendStatus(200);
  }

  removeCookie(name: string): Response {
    let options = {
      domain: process.env.COOKIE_DOMAIN,
      path: '/'
    };

    return this.res.clearCookie(name, options);
  }
}