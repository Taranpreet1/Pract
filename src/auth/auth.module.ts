import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStratergy } from './jwt.strategy';
import { UserRepository } from 'src/user/user.repository';
import { ForgetPassWordRepository } from './forget-password.repository';
import { typeOrmConfig } from 'config/typeorm.config';
import { MailerModule } from '@nestjs-modules/mailer';
import * as config from 'config';

const mailConfig = config.get('email');


@Module({
  imports: [
    // TypeOrmModule.forRoot(typeOrmConfig),
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


    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UserRepository, ForgetPassWordRepository]),
  ],
  providers: [AuthService, JwtStratergy],
  controllers: [AuthController],

  exports: [JwtStratergy, PassportModule],
})
export class AuthModule {}






