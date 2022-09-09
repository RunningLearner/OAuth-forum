import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<void> {
    await this.usersRepository.save(user);
  }

  async login(user: User): Promise<object> {
    const userInfo = await this.usersRepository.findOne({
      where: { userId: user.userId },
    });
    if (userInfo.password == user.password) {
      return { message: '로그인이 완료되었습니다.' };
    }
    return { message: '비밀번호가 틀립니다.' };
  }

  async remove(id: number): Promise<object> {
    try {
      await this.usersRepository.delete(id);
      return { message: '회원탈퇴가 완료되었습니다.' };
    } catch (error) {
      throw error;
    }
  }
}
