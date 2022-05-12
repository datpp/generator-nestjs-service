import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { RequestMethod } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // global prefix
  app.setGlobalPrefix(config.get<string>('pathPrefix'), {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  // for swagger document
  const swaggerConfig = new DocumentBuilder()
    .setTitle('<%= appName %>')
    .setDescription('<%= appDescription %>')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(config.get<number>('port'));
}

bootstrap();
