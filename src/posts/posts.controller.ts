import {
  Bind,
  Body,
  Controller,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { Roles } from 'src/users/decorator/role.decorator';
import { RoleType } from 'src/users/role-type';
import { RolesGuard } from 'src/users/security/roles.guard';
import { JwtAuthGuard } from 'src/users/security/user.guard';
import { postDTO } from './dto/postDTO';
import { PostsService } from './posts.service';
import { multerDiskOptions } from './multer.option';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN)
  @UseInterceptors(FileInterceptor('file', multerDiskOptions))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Res() res: Response,
  ): Promise<any> {
    req.body.imgUrl = file.path;
    const postDto: postDTO = req.body;
    postDto.user = req.user;
    const result = await this.postService.createPost(postDto);
    return res.json(result);
  }
}
