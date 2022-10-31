import { Body, Controller, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: UserModel,
  ): Promise<UserModel> {
    return this.usersService.update(updateUserDto, user.getId());
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@CurrentUser() user: UserModel) {
    return user;
  }

  @Get()
  async findOne(@Query() findUserDto: FindUserDto): Promise<UserModel> {
    return this.usersService.findOne(findUserDto);
  }
}
