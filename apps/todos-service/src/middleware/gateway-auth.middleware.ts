import {
  Injectable,
  NestMiddleware,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GatewayAuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(GatewayAuthMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    // check for the gateway service header
    const gatewayHeader = req.headers['x-gateway-service'];
    // const forwardedFor = req.headers['x-forwarded-for'];

    // allow requests from API Gateway only
    if (gatewayHeader !== 'api-gateway') {
      this.logger.warn(
        `Direct access attempt blocked: ${req.method} ${req.url} from ${req.ip}`,
      );

      throw new ForbiddenException({
        error: 'Forbidden',
        message: 'This service can only be accessed through the API Gateway',
        statusCode: 403,
        timestamp: new Date().toISOString(),
        path: req.url,
      });
    }

    // log successful gateway requests
    this.logger.log(`Gateway request authorized: ${req.method} ${req.url}`);

    next();
  }
}
