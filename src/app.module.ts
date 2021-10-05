import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './role/role.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { typeOrmConfig } from 'config/typeorm.config';
import { ScheduleModule } from '@nestjs/schedule';
import * as config from 'config';

const mailConfig = config.get('email');

@Module({
  imports: [
    ScheduleModule.forRoot(),

    TypeOrmModule.forRoot(typeOrmConfig),
    MailerModule.forRoot({
      transport: {
        host: mailConfig.host,
        port: mailConfig.port,
        auth: {
          user: mailConfig.user,
          pass: mailConfig.pass,
        },
      },
    }),

    //  TypeOrmModule.forRoot(typeOrmConfig),
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

    AuthModule,
    UserModule,
    RoleModule,
  ],
})
export class AppModule {}
