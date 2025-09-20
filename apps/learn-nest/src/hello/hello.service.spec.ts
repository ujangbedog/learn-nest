import { Test, TestingModule } from '@nestjs/testing';
import { HelloService } from './hello.service';

describe('HelloService', () => {
  let service: HelloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelloService],
    }).compile();

    service = module.get<HelloService>(HelloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHello', () => {
    it('should return hello message without name', () => {
      const result = service.getHello();
      expect(result).toHaveProperty('message', 'Hello, World!');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('status', 'success');
      expect(typeof result.timestamp).toBe('string');
    });

    it('should return hello message with name', () => {
      const name = 'Charlie';
      const result = service.getHello(name);
      expect(result).toHaveProperty('message', `Hello, ${name}!`);
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('status', 'success');
    });

    it('should return hello message with empty string name', () => {
      const name = '';
      const result = service.getHello(name);
      expect(result).toHaveProperty('message', 'Hello, World!');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('status', 'success');
    });
  });

  describe('getHelloWithDetails', () => {
    it('should return hello message with details without name', () => {
      const result = service.getHelloWithDetails();
      expect(result).toHaveProperty('message', 'Hello, World!');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('status', 'success');
      expect(result).toHaveProperty('details');
      expect(result.details).toEqual({
        language: 'Indonesian',
        framework: 'NestJS',
        version: '1.0.0',
      });
    });

    it('should return hello message with details and name', () => {
      const name = 'David';
      const result = service.getHelloWithDetails(name);
      expect(result).toHaveProperty('message', `Hello, ${name}!`);
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('status', 'success');
      expect(result).toHaveProperty('details');
      expect(result.details).toEqual({
        language: 'Indonesian',
        framework: 'NestJS',
        version: '1.0.0',
      });
    });
  });
});
