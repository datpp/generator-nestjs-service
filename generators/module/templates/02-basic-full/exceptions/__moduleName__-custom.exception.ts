import { HttpException, HttpStatus } from '@nestjs/common';

export class <%= kebabToPascal(config.name) %>CustomException extends HttpException {
  constructor() {
    super('your custom error message', 0); // 0: your custom http error code
  }
}
