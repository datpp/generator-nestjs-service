export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || <%= appPort %>,
  pathPrefix: process.env.GLOBAL_PATH_PREFIX || 'api',
  cache: {
    ttl: process.env.CACHE_TTL || 3600,
  },
  database: {
    <% if (useMongoose) { %>
    uri: process.env.DB_URI || `mongodb://<%= appName %>user:<%= appName %>password@localhost:27017/`,
    <% } %>
    <% if (useTypeORM) { %>
    type: 'mysql',
    url: process.env.DB_URI || `mysql://<%= appName %>user:<%= appName %>password@localhost:33061/<%= appName %>`,
    entities: ['./dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    <% } %>
  },
  <% if (useCacheRedis) { %>
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 63791, // default port is 33061 - check expose port for host in docker-compose.yml
  },
  <% } %>
});
