import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ReplaceMeCapsModule } from './replace-me/replace-me.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().port(),
        MONGO_URI: Joi.string().uri(),
      }),
    }),
    DatabaseModule,
    ReplaceMeCapsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
