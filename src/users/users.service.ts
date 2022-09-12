import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './dto/userCreateDto';
import { Payload } from 'src/users/security/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUserDTO } from './dto/authenticatedUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
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

  async create(user: UserCreateDto): Promise<any> {
    const userExist = await this.checkUserId(user.userId);
    if (userExist) {
      throw new BadRequestException('같은 아이디가 존재합니다!');
    }
    user.password = await this.transformPassword(user.password);
    const newUser = new User();
    newUser.userId = user.userId;
    newUser.password = user.password;
    await this.usersRepository.save(newUser);
    return { message: '회원가입이 완료되었습니다.' };
  }

  async login(user: UserCreateDto): Promise<any> {
    const userInfo = await this.usersRepository.findOne({
      where: { userId: user.userId },
    });
    if (!userInfo) {
      throw new UnauthorizedException('회원을 찾을 수 없습니다!');
    }
    const passwordValidation = await bcrypt.compare(
      user.password,
      userInfo.password,
    );
    if (passwordValidation) {
      const payload: Payload = {
        id: userInfo.id,
        userId: userInfo.userId,
        role: userInfo.role,
      };
      return {
        message: '로그인이 완료되었습니다.',
        accessToken: this.jwtService.sign(payload),
      };
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

  async tokenValidateUser(payload: Payload): Promise<any> {
    const user: AuthenticatedUserDTO = await this.usersRepository.findOne({
      select: { id: true, userId: true, role: true },
      where: { id: payload.id },
    });
    return user;
  }
}
