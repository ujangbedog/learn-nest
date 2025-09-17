export class HelloResponseDto {
  message: string;
  timestamp: string;
  status: string;
  details?: {
    language: string;
    framework: string;
    version: string;
  };
}
