import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AbstractRepository } from '../../database/abstract.repository';
import { ReplaceMeCapsSchemaFactory } from './replace-me-schema.factory';
import { ReplaceMeCapsModel } from './replace-me.model';
import { ReplaceMeCapsSchema } from './replace-me.schema';

@Injectable()
export class ReplaceMeCapsRepository extends AbstractRepository<
  ReplaceMeCapsSchema,
  ReplaceMeCapsModel
> {
  constructor(
    @InjectModel(ReplaceMeCapsSchema.name)
    replaceMeCamelCaseModel: Model<ReplaceMeCapsSchema>,
    replaceMeCamelCaseSchemaFactory: ReplaceMeCapsSchemaFactory,
  ) {
    super(replaceMeCamelCaseModel, replaceMeCamelCaseSchemaFactory);
  }
}
