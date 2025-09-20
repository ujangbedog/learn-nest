import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome(): any {
    return {
      status: 'ok',
      message: 'running',
      timestamp: new Date().toISOString(),
    };
  }

  getHelloMessage(name?: string): any {
    const message = name ? `Hello, ${name}!` : 'Hello, World!';

    return {
      status: 'success',
      message,
      timestamp: new Date().toISOString(),
      endpoint: '/hello',
    };
  }
}
