import { Injectable, NestMiddleware, UnauthorizedException, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const isProtected = req.headers['x-route-protected'] === 'true';
    
    if (!isProtected) {
      return next();
    }

    // check for authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      this.logger.warn(`Unauthorized access attempt to protected route: ${req.url}`);
      throw new UnauthorizedException('Authorization header is required');
    }

    // check if it's a bearer token
    if (!authHeader.startsWith('Bearer ')) {
      this.logger.warn(`Invalid authorization format: ${req.url}`);
      throw new UnauthorizedException('Invalid authorization format. Use Bearer token');
    }

    const token = authHeader.substring(7); // remove 'Bearer ' prefix
    
    // basic token validation (in production, use JWT validation)
    if (!token || token.length < 10) {
      this.logger.warn(`Invalid token format: ${req.url}`);
      throw new UnauthorizedException('Invalid token');
    }

    // add user info to request (in production, decode JWT and add user data)
    req['user'] = {
      id: 'user-123', // this would come from JWT payload
      token: token,
      timestamp: new Date().toISOString(),
    };

    this.logger.log(`Authenticated request to: ${req.url}`);
    next();
  }
}
