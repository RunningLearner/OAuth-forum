import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { postDTO } from './dto/postDTO';
import { Post } from './entity/posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async createPost(post: postDTO): Promise<any> {
    const newPost = new Post();
    newPost.title = post.title;
    newPost.content = post.content;
    newPost.imgUrl = post.imgUrl;
    newPost.price = post.price;
    newPost.user = post.user;

    await this.postsRepository.save(newPost);
    return { message: '게시글 작성이 완료되었습니다.' };
  }
}
