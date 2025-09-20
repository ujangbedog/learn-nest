import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async getHealth() {
    return this.healthService.getHealth();
  }

  @Get('services')
  async getServicesHealth() {
    return this.healthService.getServicesHealth();
  }

  @Get('ready')
  async getReadiness() {
    return this.healthService.getReadiness();
  }
}
