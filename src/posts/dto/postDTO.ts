import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entity/users.entity';

export class postDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  imgUrl?: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  user: User;
}
