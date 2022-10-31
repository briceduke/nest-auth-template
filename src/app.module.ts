import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().port().required(),
        MONGO_URI: Joi.string().uri().required(),
        JWT_ACCESS_SECRET: Joi.string().hex().min(32).required(),
        JWT_ACCESS_EXP: Joi.number().required(),
        JWT_REFRESH_SECRET: Joi.string().hex().min(32).required(),
        JWT_REFRESH_EXP: Joi.number().required(),
      }),
    }),
    ThrottlerModule.forRoot({
      ttl: 30,
      limit: 10,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
