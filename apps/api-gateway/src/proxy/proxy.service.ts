import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Request, Response, NextFunction } from 'express';
import { microservicesConfig, RouteConfig } from '../config/gateway.config';

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);
  private readonly microservices = new Map<string, any>();

  constructor() {
    this.initializeMicroservices();
  }

  private initializeMicroservices() {
    microservicesConfig.forEach((config) => {
      const proxyOptions: any = {
        target: config.url,
        changeOrigin: true,
        timeout: config.timeout ?? 5000,
      };

      this.microservices.set(config.name, createProxyMiddleware(proxyOptions));
    });
  }

  getProxyMiddleware(routeConfig: RouteConfig) {
    const microservice = this.microservices.get(routeConfig.microservice);

    if (!microservice) {
      throw new HttpException(
        `Microservice ${routeConfig.microservice} not found`,
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    return (req: Request, res: Response, next: NextFunction) => {
      // add route-specific headers
      req.headers['x-route-path'] = routeConfig.path;
      req.headers['x-route-method'] = routeConfig.method;
      req.headers['x-route-protected'] =
        routeConfig.protected?.toString() ?? 'false';

      // add gateway identification header
      req.headers['x-gateway-service'] = 'api-gateway';
      req.headers['x-forwarded-for'] = req.ip;
      req.headers['x-original-url'] = req.url;
      req.headers['x-original-method'] = req.method;

      // log the request
      this.logger.log(
        `Routing ${req.method} ${req.url} to ${routeConfig.microservice}`,
      );

      microservice(req, res, next);
    };
  }

  async checkMicroserviceHealth(serviceName: string): Promise<boolean> {
    const config = microservicesConfig.find((s) => s.name === serviceName);
    if (!config?.healthCheckUrl) {
      return false;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(config.healthCheckUrl, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      this.logger.warn(
        `Health check failed for ${serviceName}: ${error.message}`,
      );
      return false;
    }
  }

  async getMicroserviceStatus() {
    const status: Record<string, any> = {};

    for (const config of microservicesConfig) {
      status[config.name] = {
        url: config.url,
        healthy: await this.checkMicroserviceHealth(config.name),
        timestamp: new Date().toISOString(),
      };
    }

    return status;
  }
}
