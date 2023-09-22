import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request URL:', req.url);
    console.log('Request Method:', req.method);
    console.log('Request Time:', Date.now());
    next();
  }
}
