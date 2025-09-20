import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

describe('HelloController', () => {
  let controller: HelloController;
  let _service: HelloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [HelloService],
    }).compile();

    controller = module.get<HelloController>(HelloController);
    _service = module.get<HelloService>(HelloService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHello', () => {
    it('should return hello message without name', () => {
      const result = controller.getHello();
      expect(result).toHaveProperty('message', 'Hello, World!');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('status', 'success');
    });

    it('should return hello message with name', () => {
      const name = 'Alice';
      const result = controller.getHello(name);
      expect(result).toHaveProperty('message', `Hello, ${name}!`);
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('status', 'success');
    });
  });

  describe('getHelloWithDetails', () => {
    it('should return hello message with details without name', () => {
      const result = controller.getHelloWithDetails();
      expect(result).toHaveProperty('message', 'Hello, World!');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('status', 'success');
      expect(result).toHaveProperty('details');
      expect(result.details).toHaveProperty('language', 'Indonesian');
      expect(result.details).toHaveProperty('framework', 'NestJS');
      expect(result.details).toHaveProperty('version', '1.0.0');
    });

    it('should return hello message with details and name', () => {
      const name = 'Bob';
      const result = controller.getHelloWithDetails(name);
      expect(result).toHaveProperty('message', `Hello, ${name}!`);
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('status', 'success');
      expect(result).toHaveProperty('details');
      expect(result.details).toHaveProperty('language', 'Indonesian');
      expect(result.details).toHaveProperty('framework', 'NestJS');
      expect(result.details).toHaveProperty('version', '1.0.0');
    });
  });
});
