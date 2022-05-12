import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class <%= kebabToPascal(config.name) %>Middleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // do your work here
    next();
  }
}
