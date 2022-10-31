import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { UserModel } from '../../users/db/user.model';
import { CurrentUser } from '../decorators/current-user.decorator';
import { TokenPayload } from '../dto/token-payload.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import JwtRefreshGuard from '../guards/jwt-refresh.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() user: UserModel,
  ) {
    await this.authService.login(user, res);

    res.send(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: Request, @CurrentUser() user: UserModel) {
    const payload: TokenPayload = {
      userId: user.getId(),
    };

    const { accessExp, accessToken } =
      this.authService.genAccessTokenAndExp(payload);

    request.res.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: true,
      expires: accessExp,
    });

    request.res.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  isAuth() {
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() user: UserModel,
  ) {
    await this.authService.logout(res, user);

    res.json({});
  }
}
