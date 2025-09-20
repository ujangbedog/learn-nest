import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TodosServiceController } from './todos-service.controller';
import { TodosServiceService } from './todos-service.service';
import { TodosModule } from './todos/todos.module';
import { GatewayAuthMiddleware } from './middleware/gateway-auth.middleware';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../.env', '../../.env'],
    }),
    TypeOrmModule.forRoot(databaseConfig),
    TodosModule,
  ],
  controllers: [TodosServiceController],
  providers: [TodosServiceService],
})
export class TodosServiceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // apply gateway authentication middleware to all routes
    consumer.apply(GatewayAuthMiddleware).forRoutes('*');
  }
}
