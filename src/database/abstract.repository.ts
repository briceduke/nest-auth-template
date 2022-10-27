import { NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';

import { AbstractSchemaFactory } from './abstract.factory';
import { AbstractModel } from './abstract.model';
import { AbstractSchema } from './abstract.schema';

export abstract class AbstractRepository<
  TSchema extends AbstractSchema,
  TModel extends AbstractModel,
> {
  constructor(
    protected readonly model: Model<TSchema>,
    protected readonly abstractFactory: AbstractSchemaFactory<TSchema, TModel>,
  ) {}

  async create(doc: TModel): Promise<TSchema> {
    return new this.model(this.abstractFactory.create(doc)).save();
  }

  async findOne(query: FilterQuery<TSchema>): Promise<TSchema> {
    const doc = await this.model.findOne(query, {}, { lean: true });

    return doc;
  }

  async find(entityFilterQuery?: FilterQuery<TSchema>): Promise<TModel[]> {
    return (await this.model.find(entityFilterQuery, {}, { lean: true })).map(
      (entityDocument) => this.abstractFactory.createFromSchema(entityDocument),
    );
  }

  async findOneAndUpdate(
    query: FilterQuery<TSchema>,
    update: UpdateQuery<TSchema>,
  ): Promise<TSchema> {
    const doc = await this.model.findOneAndUpdate(query, update, {
      lean: true,
      new: true,
    });

    if (!doc) throw new NotFoundException();

    return doc;
  }
}
