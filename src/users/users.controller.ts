import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Roles } from './decorator/role.decorator';
import { UserCreateDto } from './dto/userCreateDto';
import { RoleType } from './role-type';
import { Payload } from './security/payload.interface';
import { RolesGuard } from './security/roles.guard';
import { JwtAuthGuard } from './security/user.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  async create(
    @Body() user: UserCreateDto,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.userService.create(user);
    return res.json(result);
  }

  @Post('/login')
  async login(@Body() user: UserCreateDto, @Res() res: Response): Promise<any> {
    const jwt = await this.userService.login(user);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    return res.json(jwt);
  }

  @Delete('/withdrawal')
  @UseGuards(JwtAuthGuard)
  async remove(@Req() req: Request): Promise<any> {
    const result = await this.userService.remove(req.user.id);
    return result;
  }

  @Get('/authenticate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.USER)
  isAuthenticated(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }
}
