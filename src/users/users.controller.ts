import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { User } from './entity/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Post('/login')
  login(@Body() user: User) {
    return this.userService.login(user);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    const result = this.userService.remove(id);
    return result;
  }
}
