export interface MicroserviceConfig {
  name: string;
  url: string;
  healthCheckUrl?: string;
  timeout?: number;
  retries?: number;
}

export interface RouteConfig {
  path: string;
  method: string;
  microservice: string;
  protected?: boolean;
  rateLimit?: {
    ttl: number;
    limit: number;
  };
}

export const microservicesConfig: MicroserviceConfig[] = [
  {
    name: 'todos-service',
    url: 'http://localhost:3001',
    healthCheckUrl: 'http://localhost:3001/api/todos',
    timeout: 5000,
    retries: 3,
  },
];

export const routesConfig: RouteConfig[] = [
  // todos service routes
  {
    path: '/api/todos',
    method: 'GET',
    microservice: 'todos-service',
    protected: false,
    rateLimit: { ttl: 60, limit: 100 },
  },
  {
    path: '/api/todos',
    method: 'POST',
    microservice: 'todos-service',
    protected: false,
    rateLimit: { ttl: 60, limit: 50 },
  },
  {
    path: '/api/todos/:id',
    method: 'GET',
    microservice: 'todos-service',
    protected: false,
    rateLimit: { ttl: 60, limit: 100 },
  },
  {
    path: '/api/todos/:id',
    method: 'PATCH',
    microservice: 'todos-service',
    protected: false,
    rateLimit: { ttl: 60, limit: 50 },
  },
  {
    path: '/api/todos/:id',
    method: 'DELETE',
    microservice: 'todos-service',
    protected: false,
    rateLimit: { ttl: 60, limit: 50 },
  },
];

export const gatewayConfig = {
  port: 3000,
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  },
  rateLimit: {
    ttl: 60,
    limit: 1000,
  },
  timeout: 30000,
  retries: 3,
};
