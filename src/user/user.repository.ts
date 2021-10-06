import {
  BadGatewayException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, getManager, In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import { ProfilePicDto } from './dto/profile-pic.dto';
import { Role } from 'src/entity/role.entity';
import { UserRole } from 'src/enum/user-role.enum';
import { profile } from 'console';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
 
    async createUser(createUserDto: CreateUserDto ,files: ProfilePicDto,): Promise<void> {
    

    const {
      first_name,
      last_name,
      username,
      email,
      password,
      phone_no,
      role_id,
      profile_pic,
    } = createUserDto;

    //hash the password we are using bcrypt with a salt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      userId: uuid(),
      firstName: first_name,
      lastName: last_name,
      email: email,
      username: username,
      password: hashedPassword,
      salt: salt,
      phoneNo: phone_no,
      role_id: role_id,
      // profilePic:profile_pic
      profilePic:files.profile_pic[0].filename,
      });

    //imp for unique user name we genrate a rendom message
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async getUser(): Promise<User[]> {
    const query = this.createQueryBuilder('user');
    query.leftJoinAndSelect('user.role', 'role');
    try {
      const user = await query.getMany();
      return user;
    } catch (error) {
      if (error) {
        throw new BadGatewayException('Not able to fetch data plese try again');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // async getUserDetails():Promise<User[]>{
  //   const query = this.createQueryBuilder('user');
  //   query.leftJoinAndSelect('user.role', 'role');
  //   try {
      
  //     const user = await query.getMany();
  //     const address = `localhost:3000/assets/profile${ProfilePic}`

      
      
  //     let newuser:any 
  //     newuser = user.map( value=> )


  //     return newuser;

  //   } catch (error) {
  //     if (error) {
  //       throw new BadGatewayException('Not able to fetch data plese try again');
  //     } else {
  //       throw new InternalServerErrorException();
  //     }
  //   }
  // }




  async createNewUser(createUserDto: CreateUserDto, user:User): Promise<void> {

    const {
      first_name,
      last_name,
      username,
      email,
      password,
      phone_no,
      role_id,
    } = createUserDto;

    
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const userac = this.create({
      userId: uuid(),
      firstName: first_name,
      lastName: last_name,
      email: email,
      username: username,
      password: hashedPassword,
      salt: salt,
      phoneNo: phone_no,
      role_id: role_id,
      createdBy:user.userId,
      createdDate: new Date(),
    });
    try {
      await this.save(userac);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }



  
































}
