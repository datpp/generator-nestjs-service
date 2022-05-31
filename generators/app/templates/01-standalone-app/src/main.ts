import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, RequestMethod } from '@nestjs/common';
import { OpenApiDocumentBuilder, OpenApiModule } from '@ivamuno/nestjs-openapi';
import * as pkgJson from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const appPort = config.get<number>('port');

  // global prefix
  app.setGlobalPrefix(config.get<string>('pathPrefix'), {
    exclude: [
      { path: '', method: RequestMethod.GET },
      { path: 'health', method: RequestMethod.GET },
    ],
  });

  // see more at https://github.com/ivamuno/nestjs-openapi
  const opeanApiOptions = new OpenApiDocumentBuilder()
    .setTitle('<%= appName %>')
    .setDescription('<%= appDescription %>')
    .setVersion(pkgJson.version)
    .addBasicAuth()
    .addBearerAuth()
    .addOAuth2()
    .addApiKey()
    .addCookieAuth()
    .addSecurityRequirements('bearer')
    .build();
  const openApidocument = OpenApiModule.createDocument(app, opeanApiOptions);
  OpenApiModule.setup('openapi', app, openApidocument, {});

  await app.listen(appPort);
  Logger.log(`Listening on http://localhost:${appPort}`, 'NestApplication');
}

bootstrap();
