import { Prop, Schema } from '@nestjs/mongoose';

import { AbstractSchema } from '../../database/abstract.schema';

@Schema({ versionKey: false, collection: 'replace-me-dashed' })
export class ReplaceMeCapsSchema extends AbstractSchema {
  @Prop()
  readonly name: string;

  @Prop()
  readonly list: string[];
}
