export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || <%= appPort %>,
  pathPrefix: process.env.GLOBAL_PATH_PREFIX || 'api',
  cache: {
    ttl: process.env.CACHE_TTL || 3600,
  },
  database: {
    <% if (useMongoose) { %>
    url: process.env.DB_URI || `mongodb://localhost/your_db_name`,
    <% } %>
    <% if (useTypeORM) { %>
    type: 'mysql',
    url: process.env.DB_URI || `mysql://root:root@localhost:3306/your_db_name`,
    entities: ['./dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    <% } %>
  },
  <% if (useCacheRedis) { %>
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
  <% } %>
});
