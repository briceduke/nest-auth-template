import { AbstractModel } from './abstract.model';
import { AbstractSchema } from './abstract.schema';

export interface AbstractSchemaFactory<
  TSchema extends AbstractSchema,
  TModel extends AbstractModel,
> {
  create(model: TModel): TSchema;
  createFromSchema(schema: TSchema): TModel;
}
