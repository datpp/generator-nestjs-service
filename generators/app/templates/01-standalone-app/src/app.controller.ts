import { Controller, Get } from '@nestjs/common';
import { OpenApiOperation, OpenApiResponse } from '@ivamuno/nestjs-openapi';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @OpenApiOperation({
    summary: 'API Info',
  })
  @OpenApiResponse({
    status: 200,
    description: 'Return API Info',
  })
  index() {
    return this.appService.apiInfo();
  }

  @Get('health')
  @OpenApiOperation({
    summary: 'Health check',
  })
  @OpenApiResponse({
    status: 200,
    description: 'Return "OK!"',
  })
  getHealthCheck(): string {
    return this.appService.getHealthCheck();
  }
}
