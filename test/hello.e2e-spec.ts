import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { HelloModule } from '../src/hello/hello.module';
import { appConfig } from '../src/config/app.config';

describe('HelloController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HelloModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // apply the same configuration as main.ts
    app.setGlobalPrefix(appConfig.apiPrefix);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Hello endpoints', () => {
    it('/api/hello (GET)', () => {
      return request(app.getHttpServer())
        .get(`/${appConfig.apiPrefix}/hello`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('timestamp');
          expect(res.body).toHaveProperty('status', 'success');
        });
    });

    it('/api/hello?name=TestUser (GET)', () => {
      return request(app.getHttpServer())
        .get(`/${appConfig.apiPrefix}/hello`)
        .query({ name: 'TestUser' })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('message', 'Hello, TestUser!');
          expect(res.body).toHaveProperty('timestamp');
          expect(res.body).toHaveProperty('status', 'success');
        });
    });

    it('/api/hello/details (GET)', () => {
      return request(app.getHttpServer())
        .get(`/${appConfig.apiPrefix}/hello/details`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('timestamp');
          expect(res.body).toHaveProperty('status', 'success');
          expect(res.body).toHaveProperty('details');
          expect(res.body.details).toHaveProperty('language', 'Indonesian');
          expect(res.body.details).toHaveProperty('framework', 'NestJS');
          expect(res.body.details).toHaveProperty('version', '1.0.0');
        });
    });

    it('/api/hello/details?name=TestUser (GET)', () => {
      return request(app.getHttpServer())
        .get(`/${appConfig.apiPrefix}/hello/details`)
        .query({ name: 'TestUser' })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('message', 'Hello, TestUser!');
          expect(res.body).toHaveProperty('timestamp');
          expect(res.body).toHaveProperty('status', 'success');
          expect(res.body).toHaveProperty('details');
          expect(res.body.details).toHaveProperty('language', 'Indonesian');
          expect(res.body.details).toHaveProperty('framework', 'NestJS');
          expect(res.body.details).toHaveProperty('version', '1.0.0');
        });
    });
  });
});
