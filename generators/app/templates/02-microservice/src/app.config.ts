export default () => ({
  environment: process.env.ENV || 'DEV',
  port: parseInt(process.env.APP_PORT, 10) || <%= appPort %>,
  cache: {
    ttl: process.env.CACHE_TTL || 3600,
  },
  database: {
<% if (useMongoose) { %>
    uri: process.env.DB_URI || `mongodb://<%= appName %>user:<%= appName %>password@localhost:27017/`,
<% } %>
<% if (useTypeORM) { %>
    type: 'mysql',
    url: process.env.DB_URI || `mysql://<%= appName %>user:<%= appName %>password@localhost:33061/<%= appName %>`, // default port is 33061 - check expose port for host in docker-compose.yml
    entities: ['./dist/**/*.entity{.ts,.js}'],
    synchronize: false,
<% } %>
  },
<% if (useCacheRedis) { %>
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 63791, // default port is 63791 - check expose port for host in docker-compose.yml
  },
<% } %>
<% if (useKafka) { %>
  // see more at https://docs.nestjs.com/microservices/kafka#options
  kafkaOptions: {
    client: {
      clientId: process.env.KAFKA_CLIENT_ID || '<%= appName %>',
      brokers: process.env.KAFKA_BROKERS && process.env.KAFKA_BROKERS.split(',') || ['localhost:9092'],
    },
    consumer: {
      groupId: process.env.KAFKA_GROUP_ID || '<%= appName %>-consumer'
    },
  },
<% } %>
<% if (useRabbitmq) { %>
  // see more at https://docs.nestjs.com/microservices/rabbitmq#options
  rabbitmqOptions: {
    urls: process.env.RABBITMQ_URI && process.env.RABBITMQ_URI.split(',') || [`amqp://localhost:5672`],
    queue: process.env.RABBITMQ_QUEUE_NAME || '<%= appName %>',
    queueOptions: {
      // durable: false
    },
  },
<% } %>
<% if (usePubSub) { %>
  // export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-file.json"
  // you need to run above command to add authorize for request to gcp
  // for more document you can found at https://docs.nestjs.com/microservices/basics#client
  gcp: {
    pubsub: {
      projectId: process.env.GCP_PROJECT_ID || '<%= GCPProjectId %>',
    }
  }
<% } %>
});
