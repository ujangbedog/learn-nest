import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let _appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    _appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return app status', () => {
      const result = appController.getHome();
      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('message', 'running');
      expect(result).toHaveProperty('timestamp');
    });
  });

  describe('hello', () => {
    it('should return hello message without name', () => {
      const result = appController.getHelloMessage();
      expect(result).toHaveProperty('status', 'success');
      expect(result).toHaveProperty('message', 'Hello, World!');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('endpoint', '/hello');
    });

    it('should return hello message with name', () => {
      const name = 'John';
      const result = appController.getHelloMessage(name);
      expect(result).toHaveProperty('status', 'success');
      expect(result).toHaveProperty('message', `Hello, ${name}!`);
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('endpoint', '/hello');
    });
  });
});
