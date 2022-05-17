import {
<% if (usePubSub || useKafka || useRabbitmq) { %>
  Inject,
  OnApplicationBootstrap,
<% } %>
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import configuration from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  ConfigModule,
<% if (usePubSub || useCacheRedis || useTypeORM || useMongoose || useKafka || useRabbitmq) { %>
  ConfigService,
<% } %>
} from '@nestjs/config';
import { AppLoggerMiddleware } from './common/middlewares/applogger';
<% if (useCacheRedis) { %>
import { CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
<% } %>
<% if (useTypeORM) { %>
import { TypeOrmModule } from '@nestjs/typeorm';
<% } %>
<% if (useMongoose) { %>
import { MongooseModule } from "@nestjs/mongoose";
<% } %>
<% if (usePubSub || useKafka || useRabbitmq) { %>
import { ClientsModule, Transport, ClientProxy } from '@nestjs/microservices';
<% } %>
<% if (usePubSub) { %>
import { GCPubSubClient } from '@algoan/nestjs-google-pubsub-client';
<% } %>

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
<% if (useCacheRedis) { %>
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (config: ConfigService) => ({
        store: redisStore,
        host: config.get<string>('redis.host'),
        port: config.get<number>('redis.port'),
        ttl: config.get<number>('cache.ttl'),
      }),
      inject: [ConfigService],
    }),
    <% } %>
<% if (useTypeORM) { %>
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => config.get(`database`),
      inject: [ConfigService],
    }),
<% } %>
<% if (useMongoose) { %>
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => config.get(`database`),
      inject: [ConfigService],
    }),
<% } %>
<% if (usePubSub || useKafka || useRabbitmq) { %>
    ClientsModule.registerAsync([
<% if (usePubSub) { %>
      {
        name: 'PUBSUB_SERVICE',
        imports: [ConfigModule],
        useFactory: async (config: ConfigService) => ({
          customClass: GCPubSubClient,
          options: config.get('gcp.pubsub'),
        }),
        inject: [ConfigService],
      },
<% } %>
<% if (useKafka) { %>
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        useFactory: async (config: ConfigService) => ({
          transport: Transport.KAFKA,
          options: config.get('kafkaOptions')
        }),
        inject: [ConfigService],
      },
<% } %>
    ]),
<% } %>
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements
  NestModule
<% if (usePubSub || useKafka || useRabbitmq) { %>
  , OnApplicationBootstrap
<% } %>
  {
<% if (usePubSub || useKafka || useRabbitmq) { %>
  constructor(
<% if (usePubSub) { %>
    @Inject('PUBSUB_SERVICE') private readonly pubsubService: ClientProxy,
<% } %>
<% if (useKafka) { %>
    @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientProxy,
<% } %>
  ) {}

  async onApplicationBootstrap() {
<% if (usePubSub) { %>
    await this.pubsubService.connect();
<% } %>
<% if (useKafka) { %>
    await this.kafkaService.connect();
<% } %>
  }
<% } %>

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
