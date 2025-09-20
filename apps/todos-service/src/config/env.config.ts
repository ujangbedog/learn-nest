export const envConfig = {
  database: {
    url: process.env.DATABASE_URL_TODOS ?? '',
  },
  service: {
    port: process.env.TODOS_SERVICE_PORT ?? 3001,
  },
};
