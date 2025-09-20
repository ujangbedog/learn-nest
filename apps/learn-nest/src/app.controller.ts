import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHome(): string {
    return this.appService.getHome();
  }

  @Get('hello')
  getHelloMessage(@Query('name') name?: string): any {
    return this.appService.getHelloMessage(name);
  }
}
