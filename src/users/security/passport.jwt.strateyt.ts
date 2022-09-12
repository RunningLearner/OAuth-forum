import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthenticatedUserDTO } from '../dto/authenticatedUserDto';
import { UsersService } from '../users.service';
import { Payload } from './payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
    const user: AuthenticatedUserDTO = await this.userService.tokenValidateUser(
      payload,
    );
    if (!user) {
      return done(new UnauthorizedException('회원을 찾을 수 없습니다!'), false);
    }
    return done(null, user);
  }
}
