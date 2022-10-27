import { AbstractSchema } from './abstract.schema';

export interface AbstractSchemaFactory<TSchema extends AbstractSchema, TModel> {
  create(model: TModel): TSchema;
  createFromSchema(schema: TSchema): TModel;
}
