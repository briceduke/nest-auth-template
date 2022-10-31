import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { AbstractSchemaFactory } from '../../database/abstract.factory';
import { UserModel } from './user.model';
import { UserSchema } from './user.schema';

@Injectable()
export class UserSchemaFactory
  implements AbstractSchemaFactory<UserSchema, UserModel>
{
  create(model: UserModel): UserSchema {
    return {
      _id: new Types.ObjectId(model.getId()),
      username: model.getUsername(),
      email: model.getEmail(),
      password: model.getPassword(),
      refreshToken: model.getRefreshToken(),
    };
  }

  createFromSchema(schema: UserSchema): UserModel {
    return new UserModel(
      schema._id.toHexString(),
      schema.username,
      schema.email,
    );
  }
}
