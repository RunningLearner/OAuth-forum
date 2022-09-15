import { IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  password: string;
}
