import { Controller, Get, Logger } from '@nestjs/common';
import { <%= kebabToPascal(config.name) %>Service } from '../services/<%= toLower(config.name) %>.service';

@Controller({ path: '/<%= toLower(config.name) %>' })
export class <%= kebabToPascal(config.name) %>Controller {
  private logger = new Logger('<%= kebabToPascal(config.name) %>Controller');

  constructor(private readonly <%= kebabToCamel(config.name) %>Service: <%= kebabToPascal(config.name) %>Service) {}

  @Get('/')
  index() {
    // something need for index of module
    return 'OK!';
  }
}
