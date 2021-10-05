import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entity/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { rolerepository } from './role.repository';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(rolerepository)
        
        private Rolerepository:rolerepository,){}

    createRole(createRoleDto:CreateRoleDto): Promise<Role>{
        return this.Rolerepository.createRole(createRoleDto);
    }
}
