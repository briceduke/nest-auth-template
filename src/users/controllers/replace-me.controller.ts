import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';

import { UserModel } from '../db/user.model';
import { FindUserDto } from '../dto/args/find-user.dto';
import { CreateUserDto } from '../dto/input/create-user.dto';
import { UpdateUserDto } from '../dto/input/update-user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.usersService.create(createUserDto);
  }

  @Patch('update')
  async update(@Body() updateUserDto: UpdateUserDto): Promise<UserModel> {
    return this.usersService.update(updateUserDto, '');
  }

  @Get()
  async findOne(@Query() findUserDto: FindUserDto): Promise<UserModel> {
    return this.usersService.findOne(findUserDto);
  }
}
