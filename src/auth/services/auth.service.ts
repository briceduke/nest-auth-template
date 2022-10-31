import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { UserModel } from '../../users/db/user.model';
import { UsersService } from '../../users/services/users.service';
import { TokenPayload } from '../dto/token-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  genAccessTokenAndExp(payload: TokenPayload): {
    accessToken: string;
    accessExp: Date;
  } {
    const accessExp = new Date();

    accessExp.setSeconds(
      accessExp.getSeconds() + this.configService.get<number>('JWT_ACCESS_EXP'),
    );

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: `${this.configService.get<number>('JWT_ACCESS_EXP')}s`,
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
    });

    return {
      accessToken,
      accessExp,
    };
  }

  genRefreshTokenAndExp(payload: TokenPayload): {
    refreshToken: string;
    refreshExp: Date;
  } {
    const refreshExp = new Date();

    refreshExp.setSeconds(
      refreshExp.getSeconds() +
        this.configService.get<number>('JWT_REFRESH_EXP'),
    );

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: `${this.configService.get<number>('JWT_REFRESH_EXP')}s`,
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });

    return {
      refreshToken,
      refreshExp,
    };
  }

  async login(user: UserModel, res: Response) {
    const payload: TokenPayload = {
      userId: user.getId(),
    };

    const { accessExp, accessToken } = this.genAccessTokenAndExp(payload);

    const { refreshExp, refreshToken } = this.genRefreshTokenAndExp(payload);

    res.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: true,
      expires: accessExp,
    });

    res.cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: true,
      expires: refreshExp,
    });

    await this.usersService.setRefreshToken(refreshToken, user.getId());
  }

  async logout(res: Response, user: UserModel) {
    await this.usersService.removeRefreshToken(user.getId());

    res.cookie('Authentication', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: true,
      expires: new Date(),
    });

    res.cookie('Refresh', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: true,
      expires: new Date(),
    });
  }
}
