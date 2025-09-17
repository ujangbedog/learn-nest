import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { appConfig } from '../src/config/app.config';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Apply the same configuration as main.ts
    app.setGlobalPrefix(appConfig.apiPrefix);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Root endpoint', () => {
    it('/api (GET)', () => {
      return request(app.getHttpServer())
        .get(`/${appConfig.apiPrefix}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('status', 'ok');
          expect(res.body).toHaveProperty('message', 'running');
          expect(res.body).toHaveProperty('timestamp');
        });
    });
  });

  describe('Hello endpoint', () => {
    it('/api/hello (GET)', () => {
      return request(app.getHttpServer())
        .get(`/${appConfig.apiPrefix}/hello`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('status', 'success');
          expect(res.body).toHaveProperty('message', 'Hello, World!');
          expect(res.body).toHaveProperty('timestamp');
          expect(res.body).toHaveProperty('endpoint', '/hello');
        });
    });

    it('/api/hello?name=John (GET)', () => {
      return request(app.getHttpServer())
        .get(`/${appConfig.apiPrefix}/hello`)
        .query({ name: 'John' })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('status', 'success');
          expect(res.body).toHaveProperty('message', 'Hello, John!');
          expect(res.body).toHaveProperty('timestamp');
          expect(res.body).toHaveProperty('endpoint', '/hello');
        });
    });
  });
});
