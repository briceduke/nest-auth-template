import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      // useFactory: (configService: ConfigService) => ({
      //   secret: configService.get<string>('JWT_ACCESS_SECRET'),
      //   signOptions: {
      //     expiresIn: `${configService.get<number>('JWT_ACCESS_EXP')}s`,
      //   },
      // }),
      // inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule {}
