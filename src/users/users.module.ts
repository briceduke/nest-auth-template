import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';

import { UsersController } from './controllers/users.controller';
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
  exports: [UsersService],
})
export class UsersModule {}
