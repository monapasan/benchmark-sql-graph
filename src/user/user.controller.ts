import {
  Controller,
  Get,
  Post,
  Param,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../model/user.entity';
import { UserRO } from './user.interface';
import { CreateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private serv: UserService) {}

  @Get()
  public async getAll(): Promise<User[]> {
    return await await this.serv.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserRO> {
    console.log(`getting user with id: ${id}`);
    const user = this.serv.get(id);
    return user;
  }

  @UsePipes(new ValidationPipe())
  @Post()
  public async create(@Body('user') userData: CreateUserDto) {
    return await this.serv.create(userData);
  }
}
