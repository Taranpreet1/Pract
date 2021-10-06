import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './role/role.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { typeOrmConfig } from 'config/typeorm.config';
import { ScheduleModule } from '@nestjs/schedule';
import * as config from 'config';
import { chatGateWay } from './chat/chat.gateway';

const mailConfig = config.get('email');

@Module({
  imports: [
    ScheduleModule.forRoot(),

    TypeOrmModule.forRoot(typeOrmConfig),
    

    
    // TypeOrmModule.forRoot({
    //   type:'postgres',
    //   host:'localhost',
    //   port:5432,
    //   username:'postgres',
    //   password:'postgres',
    //   database:'pract',
    //   autoLoadEntities:true,
    //   synchronize:true,
    // }),

    

    AuthModule,
    UserModule,
    RoleModule,
    
  ],
  providers: [chatGateWay,]
})
export class AppModule {}
