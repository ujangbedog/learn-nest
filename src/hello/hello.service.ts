import { Injectable } from '@nestjs/common';
import { HelloResponseDto } from './dto/hello-response.dto';

@Injectable()
export class HelloService {
  getHello(name?: string): HelloResponseDto {
    const message = name ? `Hello, ${name}!` : 'Hello, World!';

    return {
      message,
      timestamp: new Date().toISOString(),
      status: 'success',
    };
  }

  getHelloWithDetails(name?: string): HelloResponseDto {
    const message = name ? `Hello, ${name}!` : 'Hello, World!';

    return {
      message,
      timestamp: new Date().toISOString(),
      status: 'success',
      details: {
        language: 'Indonesian',
        framework: 'NestJS',
        version: '1.0.0',
      },
    };
  }
}
