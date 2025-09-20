import { Controller, All, Req, Res, Next } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { ProxyService } from './proxy/proxy.service';
import { routesConfig } from './config/gateway.config';

@Controller()
export class GatewayController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('*')
  async handleAllRequests(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const { method, originalUrl } = req;

    // find matching route configuration
    const routeConfig = this.findMatchingRoute(originalUrl, method);

    if (!routeConfig) {
      return res.status(404).json({
        error: 'Route not found',
        path: originalUrl,
        method: method,
        timestamp: new Date().toISOString(),
      });
    }

    try {
      // get proxy middleware for the route
      const proxyMiddleware = this.proxyService.getProxyMiddleware(routeConfig);

      // execute proxy middleware
      proxyMiddleware(req, res, next);
    } catch (error) {
      return res.status(503).json({
        error: 'Service unavailable',
        service: routeConfig.microservice,
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  }

  private findMatchingRoute(url: string, method: string) {
    // remove query parameters for matching
    const path = url.split('?')[0];

    return routesConfig.find((route) => {
      // convert route path to regex pattern
      const pattern = route.path
        .replace(/:\w+/g, '[^/]+') // replace :id with [^/]+
        .replace(/\//g, '\\/'); // escape forward slashes

      const regex = new RegExp(`^${pattern}$`);

      return regex.test(path) && route.method === method;
    });
  }
}
