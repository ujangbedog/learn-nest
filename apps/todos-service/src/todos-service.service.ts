import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
