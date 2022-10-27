import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';

import { ReplaceMeCapsController } from './controllers/replace-me.controller';
import { ReplaceMeCapsSchemaFactory } from './db/replace-me-schema.factory';
import { ReplaceMeCapsRepository } from './db/replace-me.repository';
import { ReplaceMeCapsSchema } from './db/replace-me.schema';
import { ReplaceMeCapsService } from './services/replace-me.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ReplaceMeCapsSchema.name,
        schema: SchemaFactory.createForClass(ReplaceMeCapsSchema),
      },
    ]),
  ],
  controllers: [ReplaceMeCapsController],
  providers: [
    ReplaceMeCapsService,
    ReplaceMeCapsRepository,
    ReplaceMeCapsSchemaFactory,
  ],
})
export class ReplaceMeCapsModule {}
