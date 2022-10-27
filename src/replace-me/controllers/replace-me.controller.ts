import { Body, Controller, Post } from '@nestjs/common';

import { ReplaceMeCapsModel } from '../db/replace-me.model';
import { CreateReplaceMeCapsDto } from '../dto/input/create-replace-me.dto';
import { ReplaceMeCapsService } from '../services/replace-me.service';

@Controller()
export class ReplaceMeCapsController {
  constructor(
    private readonly replaceMeCamelCaseService: ReplaceMeCapsService,
  ) {}

  @Post()
  async create(
    @Body() createReplaceMeCamelCaseDto: CreateReplaceMeCapsDto,
  ): Promise<ReplaceMeCapsModel> {
    return this.replaceMeCamelCaseService.create(createReplaceMeCamelCaseDto);
  }
}
