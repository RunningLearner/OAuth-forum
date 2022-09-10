import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private async checkUserId(userId: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { userId: userId },
    });
    return user !== null;
  }

  private async transformPassword(password: string) {
    password = await bcrypt.hash(password, 12);
    return password;
  }

  async create(user: User): Promise<any> {
    const userExist = await this.checkUserId(user.userId);
    if (userExist) {
      throw new BadRequestException('같은 아이디가 존재합니다!');
    }
    user.password = await this.transformPassword(user.password);
    await this.usersRepository.save(user);
    return { message: '회원가입이 완료되었습니다.' };
  }

  async login(user: User): Promise<any> {
    const userInfo = await this.usersRepository.findOne({
      where: { userId: user.userId },
    });
    const passwordValidation = await bcrypt.compare(
      user.password,
      userInfo.password,
    );
    if (passwordValidation) {
      return { message: '로그인이 완료되었습니다.' };
    }
    throw new UnauthorizedException('회원정보가 틀립니다!');
  }

  async remove(id: number): Promise<any> {
    try {
      await this.usersRepository.delete(id);
      return { message: '회원탈퇴가 완료되었습니다.' };
    } catch (error) {
      throw error;
    }
  }
}
