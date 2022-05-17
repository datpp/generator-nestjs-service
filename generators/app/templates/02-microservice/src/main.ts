import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { AsyncApiDocumentBuilder, AsyncApiModule, AsyncServerObject } from '@ivamuno/nestjs-openapi';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as pkgJson from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const appPort = config.get<number>('port');

<% if (useKafka) { %>
  app.connectMicroservice(
    {
      transport: Transport.KAFKA,
      options: config.get('kafkaOptions'),
    },
    { inheritAppConfig: true },
  );
<% } %>

  // see more at https://github.com/ivamuno/nestjs-openapi
  const asyncApiServer: AsyncServerObject = {
    url: 'server.p-url:{port}',
    protocol: 'amqp',
    protocolVersion: '0.9.1',
    description: 'Allows you to connect using the AMQP protocol to our RabbitMQ server.',
    security: [{ 'user-password': [] }],
    variables: {
      port: {
        description: 'Secure connection (TLS) is available through port 5672.',
        default: '5672',
        enum: ['5672'],
      },
    },
    bindings: {
      amqp: {},
    },
  };

  const asyncApiOptions = new AsyncApiDocumentBuilder()
    .setTitle('<%= appName %>')
    .setDescription('<%= appDescription %>')
    .setVersion(pkgJson.version)
    .setDefaultContentType('application/json')
    .addSecurity('user-password', { type: 'userPassword' })
    .addServer('<%= appName %>-server', asyncApiServer)
    .build();

  const asyncApiDocument = AsyncApiModule.createDocument(app, asyncApiOptions);
  AsyncApiModule.setup('asyncapi', app, asyncApiDocument);

  await app.startAllMicroservices();
  await app.listen(appPort);
  Logger.log(`Service is ready! Listening on http://localhost:${appPort}`, 'NestApplication');
}

bootstrap();
