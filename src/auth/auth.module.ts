import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStratergy } from './jwt.strategy';
import { UserRepository } from 'src/user/user.repository';
import { ForgetPassWordRepository } from './forget-password.repository';
import * as config from 'config';
import { MulterModule } from '@nestjs/platform-express';

const jwtConfig = config.get('jwt');
@Module({
  imports: [

    MulterModule.register({
			dest: "./assets",
		}),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConfig.SecretKey,
      signOptions: {
        expiresIn:jwtConfig.ExpireIn
      },
    }),
    TypeOrmModule.forFeature([UserRepository, ForgetPassWordRepository]),
  ],
  providers: [AuthService, JwtStratergy],
  controllers: [AuthController],

  exports: [JwtStratergy, PassportModule],
})
export class AuthModule {}






