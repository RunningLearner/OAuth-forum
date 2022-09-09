import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { User } from './entity/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  create(@Body() user: User) {
    console.log('user');
    return this.userService.create(user);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    this.userService.remove(id);
  }
}
