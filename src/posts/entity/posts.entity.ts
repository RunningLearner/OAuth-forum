import { User } from 'src/users/entity/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  imgUrl: string;

  @Column()
  price: number;

  @ManyToOne((type) => User, (user) => user.posts)
  user: User;
}
