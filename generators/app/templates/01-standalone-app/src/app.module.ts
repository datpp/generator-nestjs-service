import {
<% if (usePubSub) { %>
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
<% if (usePubSub || useCacheRedis || useTypeORM || useMongoose) { %>
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
<% if (usePubSub) { %>
import { ClientsModule, ClientProxy } from '@nestjs/microservices';
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
<% if (usePubSub) { %>
    ClientsModule.registerAsync([
      {
        name: 'PUBSUB_CLIENT',
        imports: [ConfigModule],
        useFactory: async (config: ConfigService) => ({
          customClass: GCPubSubClient,
          options: config.get('gcp.pubsub'),
        }),
        inject: [ConfigService],
      },
    ]),
<% } %>
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements
  NestModule
<% if (usePubSub) { %>
  , OnApplicationBootstrap
<% } %>
  {
<% if (usePubSub) { %>
  constructor(@Inject('PUBSUB_CLIENT') private readonly client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }
<% } %>

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
