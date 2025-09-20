import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { TodosServiceFallback } from './todos.service.fallback';
import { TodosController } from './todos.controller';
import { Todo } from './entities/todo.entity';
import { envConfig } from '../config/env.config';

// check if we have a valid database url
const hasValidDatabaseUrl =
  envConfig.database.url && envConfig.database.url !== '';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [
    {
      provide: 'TodosService',
      useClass: hasValidDatabaseUrl ? TodosService : TodosServiceFallback,
    },
  ],
  exports: ['TodosService'],
})
export class TodosModule {}
