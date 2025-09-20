import { Injectable, Logger } from '@nestjs/common';
import { ProxyService } from '../proxy/proxy.service';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(private readonly proxyService: ProxyService) {}

  async getHealth() {
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();

    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: `${Math.floor(uptime)}s`,
      memory: {
        used: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
        total: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
        external: `${Math.round(memoryUsage.external / 1024 / 1024)}MB`,
      },
      version: process.env.npm_package_version || '1.0.0',
      node: process.version,
    };
  }

  async getServicesHealth() {
    try {
      const servicesStatus = await this.proxyService.getMicroserviceStatus();

      const allHealthy = Object.values(servicesStatus).every(
        (service: any) => service.healthy,
      );

      return {
        status: allHealthy ? 'healthy' : 'degraded',
        timestamp: new Date().toISOString(),
        services: servicesStatus,
        summary: {
          total: Object.keys(servicesStatus).length,
          healthy: Object.values(servicesStatus).filter((s: any) => s.healthy)
            .length,
          unhealthy: Object.values(servicesStatus).filter(
            (s: any) => !s.healthy,
          ).length,
        },
      };
    } catch (error) {
      this.logger.error(`Error checking services health: ${error.message}`);
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error.message,
        services: {},
      };
    }
  }

  async getReadiness() {
    try {
      const servicesStatus = await this.proxyService.getMicroserviceStatus();
      const criticalServices = ['todos-service']; // define critical services
      const criticalServicesHealthy = criticalServices.every(
        (serviceName) => servicesStatus[serviceName]?.healthy,
      );

      if (!criticalServicesHealthy) {
        return {
          status: 'not ready',
          timestamp: new Date().toISOString(),
          reason: 'Critical services are not available',
          services: servicesStatus,
        };
      }

      return {
        status: 'ready',
        timestamp: new Date().toISOString(),
        services: servicesStatus,
      };
    } catch (error) {
      this.logger.error(`Error checking readiness: ${error.message}`);
      return {
        status: 'not ready',
        timestamp: new Date().toISOString(),
        reason: error.message,
      };
    }
  }
}
