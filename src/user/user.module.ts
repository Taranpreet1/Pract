import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';


@Module({
    imports:[
      TypeOrmModule.forFeature([UserRepository]),
      AuthModule
    ],
    controllers: [UserController],
    providers: [UserService]
  })
  export class UserModule {}