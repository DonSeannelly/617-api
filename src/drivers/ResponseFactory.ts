import RouteResponder from './RouteResponder';
import { Responder } from '../interfaces';
import { Response } from 'express';

export class ResponseFactory {
  public buildResponder(res: Response): Responder {
    return new RouteResponder(res);
  }
}
