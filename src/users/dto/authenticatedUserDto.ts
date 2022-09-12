import { IsNotEmpty } from 'class-validator';
import { RoleType } from '../role-type';

export class AuthenticatedUserDTO {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  role?: RoleType;
}
