import { IsMongoId, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class FindUserDto {
  @IsMongoId()
  @IsOptional()
  readonly _id?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(16)
  readonly username?: string;
}
