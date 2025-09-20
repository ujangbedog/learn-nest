export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  timestamp: string;
  error?: {
    code: string;
    details: string;
  };
}
