import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Todo } from '../todos/entities/todo.entity';
import { envConfig } from './env.config';

// check if we have a valid database url
const hasValidDatabaseUrl =
  envConfig.database.url && envConfig.database.url !== '';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: hasValidDatabaseUrl
    ? envConfig.database.url
    : 'postgresql://postgres:password@localhost:5432/postgres',
  entities: [Todo],
  synchronize: true, // set to false in production
  logging: true,
  ssl: hasValidDatabaseUrl
    ? {
        rejectUnauthorized: false,
      }
    : false,
  // add retry configuration
  retryAttempts: 3,
  retryDelay: 3000,
};
