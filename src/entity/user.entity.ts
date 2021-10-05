import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity('user')
export class User extends BaseEntity {
  // @Column('uuid', { primary: true, name: 'user_id' })
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column('character varying', { name: 'first_name', length: 255 })
  firstName: string;

  @Column('character varying', { name: 'last_name', length: 255 })
  lastName: string;

  @Column('character varying', { name: 'username', length: 255 })
  username: string;

  @Column('character varying', { name: 'email', length: 255 })
  email: string;

  @Column('character varying', { name: 'salt', length: 255 })
  salt: string;

  @Column('character varying', { name: 'password', length: 255 })
  password: string;

  @Column('character varying', { name: 'phone_no', length: 20 })
  phoneNo: string;

  @Column('uuid', { name: 'created_by', nullable: true })
  createdBy: string | null;

  @Column('uuid', { name: 'updated_by', nullable: true })
  updatedBy: string | null;

  @Column('timestamp with time zone', { name: 'created_date', nullable: true })
  createdDate: Date | null;

  @Column('timestamp with time zone', { name: 'updated_date', nullable: true })
  updatedDate: Date | null;

  @ManyToOne((_type) => Role, (role) => role.user_role, { eager: true })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role: Role;

  @Column('integer', { name: 'role_id', nullable: true })
  role_id: number | null;

  @ManyToOne(() => User, (user) => user.users)
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'userId' }])
  createdBy2: User;

  @OneToMany(() => User, (user) => user.createdBy2)
  users: User[];

  @ManyToOne(() => User, (user) => user.users2)
  @JoinColumn([{ name: 'updated_by', referencedColumnName: 'userId' }])
  updatedBy2: User;

  @OneToMany(() => User, (user) => user.updatedBy2)
  users2: User[];

  @Column('character varying', {
    name: 'profile_pic',
    nullable: true,
    length: 255,
  })
  profilePic: string | null;
}
