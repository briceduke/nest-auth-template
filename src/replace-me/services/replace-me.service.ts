import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { ReplaceMeCapsModel } from '../db/replace-me.model';
import { ReplaceMeCapsRepository } from '../db/replace-me.repository';
import { CreateReplaceMeCapsDto } from '../dto/input/create-replace-me.dto';

@Injectable()
export class ReplaceMeCapsService {
  constructor(
    private readonly replaceMeCamelCaseRepository: ReplaceMeCapsRepository,
  ) {}

  async create(
    createReplaceMeCamelCaseDto: CreateReplaceMeCapsDto,
  ): Promise<ReplaceMeCapsModel> {
    const doc = new ReplaceMeCapsModel(
      createReplaceMeCamelCaseDto.name,
      createReplaceMeCamelCaseDto.list,
      new Types.ObjectId().toHexString(),
    );

    await this.replaceMeCamelCaseRepository.create(doc);

    return doc;
  }

  //   async findOne(name: string): Promise<ReplaceMeCapsModel> {
  //     return this.replaceMeCamelCaseRepository.findOne({ name });
  //   }
}
