import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AbstractRepository } from '../../database/abstract.repository';
import { UserSchemaFactory } from './user-schema.factory';
import { UserModel } from './user.model';
import { UserSchema } from './user.schema';

@Injectable()
export class UsersRepository extends AbstractRepository<UserSchema, UserModel> {
  constructor(
    @InjectModel(UserSchema.name)
    userModel: Model<UserSchema>,
    usersSchemaFactory: UserSchemaFactory,
  ) {
    super(userModel, usersSchemaFactory);
  }
}
