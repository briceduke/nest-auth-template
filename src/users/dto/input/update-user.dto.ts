import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(16)
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  readonly password: string;
}
