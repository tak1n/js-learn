import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getHello(@Req() req: any): string {
    // return this.appService.getHello();
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(): any {
    return { message: 'Logged in!' };
  }
}
