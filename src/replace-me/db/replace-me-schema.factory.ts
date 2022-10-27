import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { AbstractSchemaFactory } from '../../database/abstract.factory';
import { ReplaceMeCapsModel } from './replace-me.model';
import { ReplaceMeCapsSchema } from './replace-me.schema';

@Injectable()
export class ReplaceMeCapsSchemaFactory
  implements AbstractSchemaFactory<ReplaceMeCapsSchema, ReplaceMeCapsModel>
{
  create(model: ReplaceMeCapsModel): ReplaceMeCapsSchema {
    return {
      _id: new Types.ObjectId(model.getId()),
      name: model.getName(),
      list: model.getList(),
    };
  }

  createFromSchema(schema: ReplaceMeCapsSchema): ReplaceMeCapsModel {
    return new ReplaceMeCapsModel(
      schema.name,
      schema.list,
      schema._id.toHexString(),
    );
  }
}
