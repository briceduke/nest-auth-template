import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';

import { UsersController } from './controllers/replace-me.controller';
import { UserSchemaFactory } from './db/user-schema.factory';
import { UserSchema } from './db/user.schema';
import { UsersRepository } from './db/users.repository';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserSchema.name,
        schema: SchemaFactory.createForClass(UserSchema),
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UserSchemaFactory],
})
export class UsersModule {}
