import { Test, TestingModule } from '@nestjs/testing';
import { TodosServiceController } from './todos-service.controller';
import { TodosServiceService } from './todos-service.service';

describe('TodosServiceController', () => {
  let todosServiceController: TodosServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TodosServiceController],
      providers: [TodosServiceService],
    }).compile();

    todosServiceController = app.get<TodosServiceController>(TodosServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(todosServiceController.getHello()).toBe('Hello World!');
    });
  });
});
