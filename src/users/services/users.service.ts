import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';

import { UserSchemaFactory } from '../db/user-schema.factory';
import { UserModel } from '../db/user.model';
import { UsersRepository } from '../db/users.repository';
import { FindUserDto } from '../dto/args/find-user.dto';
import { CreateUserDto } from '../dto/input/create-user.dto';
import { UpdateUserDto } from '../dto/input/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userSchemaFactory: UserSchemaFactory,
  ) {}

  async validate(username: string, password: string): Promise<UserModel> {
    const user = await this.usersRepository.findOne({ username });

    if (!user) throw new NotFoundException();

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) throw new UnauthorizedException();

    return this.userSchemaFactory.createFromSchema(user);
  }

  async create({
    username,
    email,
    password,
  }: CreateUserDto): Promise<UserModel> {
    const userExists = await this.usersRepository.findOne({ username });

    if (userExists) throw new BadRequestException('User exists!');

    const doc = new UserModel(
      new Types.ObjectId().toHexString(),
      username,
      email,
      await bcrypt.hash(password, 13),
    );

    const user = await this.usersRepository.create(doc);

    return this.userSchemaFactory.createFromSchema(user);
  }

  async update(data: UpdateUserDto, userId: string): Promise<UserModel> {
    const userDoc = await this.usersRepository.findOneAndUpdate(
      { _id: userId },
      data,
    );

    if (!userDoc) throw new NotFoundException();

    return this.userSchemaFactory.createFromSchema(userDoc);
  }

  async findOne(data: FindUserDto): Promise<UserModel> {
    if (!data._id && !data.username) throw new BadRequestException();

    const userDoc = await this.usersRepository.findOne(data);

    if (!userDoc) throw new NotFoundException();

    return this.userSchemaFactory.createFromSchema(userDoc);
  }

  async setRefreshToken(refreshToken: string, userId: string) {
    const hashed = await bcrypt.hash(refreshToken, 13);

    await this.usersRepository.findOneAndUpdate(
      { _id: userId },
      { refreshToken: hashed },
    );
  }

  async removeRefreshToken(userId: string) {
    await this.usersRepository.findOneAndUpdate(
      { _id: userId },
      { refreshToken: null },
    );
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: string,
  ): Promise<UserModel> {
    const user = await this.usersRepository.findOne({ _id: userId });

    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);

    if (isValid) return this.userSchemaFactory.createFromSchema(user);
  }
}
