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
  const asyncApiOptions = new AsyncApiDocumentBuilder()
      .setTitle('<%= appName %>')
      .setDescription('<%= appDescription %>')
      .setVersion(pkgJson.version)
      .setDefaultContentType('application/json');

<% if (useKafka) { %>
  app.connectMicroservice(
    {
      transport: Transport.KAFKA,
      options: config.get('kafkaOptions'),
    },
    { inheritAppConfig: true },
  );

  // see more at https://github.com/ivamuno/nestjs-openapi
  const kafkaBrokersUrls = config.get('kafkaOptions.client.brokers');
  kafkaBrokersUrls.forEach((url, idx) => {
    const asyncApiServer: AsyncServerObject = {
      url: url,
      protocol: 'kafka',
      protocolVersion: '2.6.8',
      description: 'Allows you to connect using the Kafka protocol to our Kafka server.',
      security: [{ 'user-password': [] }],
      variables: {
        port: {
          description: 'Secure connection (TLS) is available through port 9092.',
          default: '9092',
          enum: ['9092'],
        },
      },
      bindings: {
        kafka: {},
      },
    };

    asyncApiOptions.addServer(`<%= appName %>-broker-${idx}`, asyncApiServer);
  });
<% } %>
<% if (useRabbitmq) { %>
  app.connectMicroservice(
    {
      transport: Transport.RMQ,
      options: config.get('rabbitmqOptions'),
    },
    { inheritAppConfig: true },
  );
  // see more at https://github.com/ivamuno/nestjs-openapi
  const rabbitmqServerUrls = config.get('rabbitmqOptions.urls');
  rabbitmqServerUrls.forEach((url, idx) => {
    const asyncApiServer: AsyncServerObject = {
      url: url.replace('amqp://', ''),
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

    asyncApiOptions.addServer(`<%= appName %>-server-${idx}`, asyncApiServer);
  });
<% } %>

  const asyncApiDocument = AsyncApiModule.createDocument(app, asyncApiOptions.build(), {});
  AsyncApiModule.setup('asyncapi', app, asyncApiDocument);

  await app.startAllMicroservices();
  await app.listen(appPort);
  Logger.log(`Service is ready! Listening on http://localhost:${appPort}`, 'NestApplication');
}

bootstrap();
