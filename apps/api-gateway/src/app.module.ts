import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GatewayController } from './gateway.controller';
import { HealthModule } from './health/health.module';
import { ProxyService } from './proxy/proxy.service';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { gatewayConfig } from './config/gateway.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({ gateway: gatewayConfig })],
    }),
    HealthModule,
  ],
  controllers: [GatewayController],
  providers: [ProxyService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // apply logging middleware to all routes
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
