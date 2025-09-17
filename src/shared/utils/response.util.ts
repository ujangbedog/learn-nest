import { ApiResponse } from '../interfaces/api-response.interface';

export class ResponseUtil {
  static success<T>(data: T, message: string = 'Success'): ApiResponse<T> {
    return {
      status: 'success',
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  static error(message: string, code: string = 'UNKNOWN_ERROR'): ApiResponse {
    return {
      status: 'error',
      message,
      timestamp: new Date().toISOString(),
      error: {
        code,
        details: message,
      },
    };
  }
}
