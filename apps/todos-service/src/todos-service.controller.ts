import { Controller, Get } from '@nestjs/common';
import { TodosServiceService } from './todos-service.service';

@Controller()
export class TodosServiceController {
  constructor(private readonly todosServiceService: TodosServiceService) {}

  @Get()
  getHello(): string {
    return this.todosServiceService.getHello();
  }
}
