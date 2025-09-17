export const appConfig = {
  port: process.env.PORT ?? 3000,
  environment: process.env.NODE_ENV ?? 'development',
  apiPrefix: 'api',
  cors: {
    origin: process.env.CORS_ORIGIN ?? '*',
    credentials: true,
  },
} as const;
