import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

const RoleEnum = {
  admin: 'admin',
  user: 'user',
} as const;
type RoleEnum = typeof RoleEnum[keyof typeof RoleEnum];

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  password: string;

  @Column({ type: 'enum', name: 'role', enum: RoleEnum })
  role: RoleEnum;
}
