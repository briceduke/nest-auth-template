import { Prop, Schema } from '@nestjs/mongoose';

import { AbstractSchema } from '../../database/abstract.schema';

@Schema({ versionKey: false, collection: 'users' })
export class UserSchema extends AbstractSchema {
  @Prop()
  readonly username: string;

  @Prop()
  readonly email: string;

  @Prop()
  readonly password: string;
}
