import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as packageInfo from '../package.json';

@Injectable()
export class AppService {
  constructor(protected readonly config: ConfigService) {}

  getHealthCheck(): string {
    return 'OK!';
  }

  apiInfo() {
    return {
      name: '<%= appName %>',
      version: packageInfo.version,
      location: {
        apiPrefix: `/${this.config.get<string>('pathPrefix')}`,
        docs: '/docs',
        healthCheck: '/health',
      },
    };
  }
}
