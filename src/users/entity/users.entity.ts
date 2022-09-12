import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
