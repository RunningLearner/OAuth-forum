import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// const RoleEnum = {
//   admin: 'admin',
//   user: 'user',
// } as const;
// type RoleEnum = typeof RoleEnum[keyof typeof RoleEnum];

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
}
