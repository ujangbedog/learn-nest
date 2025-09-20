import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { gatewayConfig } from './config/gateway.config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // enable CORS
    app.enableCors(gatewayConfig.cors);

    // enable validation pipes
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // set global prefix
    app.setGlobalPrefix('api');

    // get port from config or environment
    const port = configService.get('GATEWAY_PORT') || gatewayConfig.port;

    await app.listen(port);

    logger.log(`🚀 API Gateway is running on: http://localhost:${port}`);
    logger.log(
      `📊 Health check available at: http://localhost:${port}/api/health`,
    );
    logger.log(
      `🔍 Services status at: http://localhost:${port}/api/health/services`,
    );
    logger.log(
      `✅ Readiness check at: http://localhost:${port}/api/health/ready`,
    );
  } catch (error) {
    logger.error('Failed to start API Gateway:', error);
    process.exit(1);
  }
}

bootstrap();
