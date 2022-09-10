import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/userCreateDto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  async create(@Body() user: UserCreateDto): Promise<any> {
    return await this.userService.create(user);
  }

  @Post('/login')
  async login(@Body() user: UserCreateDto): Promise<any> {
    return await this.userService.login(user);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number): Promise<any> {
    const result = await this.userService.remove(id);
    return result;
  }
}
