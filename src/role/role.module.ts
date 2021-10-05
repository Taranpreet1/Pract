import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RoleController } from './role.controller';
import { rolerepository } from './role.repository';
import { RoleService } from './role.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([rolerepository]), AuthModule],

  controllers: [RoleController],

  providers: [RoleService]
})
export class RoleModule {}
