import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { AuthenticatedGuard } from './auth/authenticated.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  // For Session based authentication
  // @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Req() req: any): string {
    // return this.appService.getHello();
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: any): any {
    return this.authService.login(req.user);
  }
}
