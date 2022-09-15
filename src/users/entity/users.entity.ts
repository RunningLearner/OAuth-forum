import { Post } from 'src/posts/entity/posts.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleType } from '../role-type';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  password: string;

  @Column({ type: 'enum', name: 'role', enum: RoleType, default: 'ROLE_USER' })
  role?: RoleType;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];
}
