import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { ProxyService } from '../proxy/proxy.service';

@Module({
  controllers: [HealthController],
  providers: [HealthService, ProxyService],
  exports: [HealthService],
})
export class HealthModule {}
