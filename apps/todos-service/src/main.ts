import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { TodosServiceModule } from './todos-service.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(TodosServiceModule);

    // enable CORS
    app.enableCors({
      origin: ['http://localhost:3000', 'http://localhost:3001'],
      credentials: true,
    });

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

    const port = process.env.TODOS_SERVICE_PORT ?? 3001;
    await app.listen(port);

    logger.log(`Todos Service is running on: http://localhost:${port}`);
    logger.log(`Todos API available at: http://localhost:${port}/api/todos`);
  } catch (error) {
    logger.error('Failed to start Todos Service:', error);
    process.exit(1);
  }
}

bootstrap();
