import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleModule } from './role/role.module';
import * as config from 'config';
import { MailerModule } from '@nestjs-modules/mailer';
import { typeOrmConfig } from 'config/typeorm.config';

const mailConfig = config.get('email');

@Module({
  imports: [
   
   
    //  TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'postgres',
      database:'pract',
      autoLoadEntities:true,
      synchronize:true,
  
    }),
    
    // MailerModule.forRoot({
    //   transport: {
    //     host: mailConfig.host,
    //     port: mailConfig.port,
    //     auth: {
    //       user: mailConfig.user,
    //       pass: mailConfig.pass,
    //     },
    //   },
    // }),
    
    
    
   AuthModule, UserModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}




