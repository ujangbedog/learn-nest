import { Controller, Get, Query } from '@nestjs/common';
import { HelloService } from './hello.service';
import { HelloResponseDto } from './dto/hello-response.dto';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getHello(@Query('name') name?: string): HelloResponseDto {
    return this.helloService.getHello(name);
  }

  @Get('details')
  getHelloWithDetails(@Query('name') name?: string): HelloResponseDto {
    return this.helloService.getHelloWithDetails(name);
  }
}
