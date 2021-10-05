import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  role: String;

  @OneToMany((_type) => User, (user) => user.role, { eager: false })
  user_role: User[];
}
