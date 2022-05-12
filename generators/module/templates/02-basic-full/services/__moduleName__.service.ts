import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class <%= kebabToPascal(config.name) %>Service {
  private logger = new Logger('<%= kebabToPascal(config.name) %>Service');

  constructor(protected readonly config: ConfigService) {}
}
