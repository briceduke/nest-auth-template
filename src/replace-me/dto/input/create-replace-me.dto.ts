import { IsString } from 'class-validator';

export class CreateReplaceMeCapsDto {
  @IsString()
  readonly name: string;

  @IsString({ each: true })
  readonly list: string[];
}
