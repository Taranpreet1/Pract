import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { Role } from "src/entity/role.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";

@EntityRepository(Role)
    export class rolerepository extends Repository<Role>{

        async  createRole(createRoleDto:CreateRoleDto): Promise<Role>{
            const{ role } = createRoleDto;
    
            const Role =  this.create({
                role,
            });

            try{
            await this.save(Role);
            return Role;
            } catch(error){
                if(error){
                    throw new ConflictException("Role must be USER or ADMIN")
                }
                else{
                    throw new InternalServerErrorException();
                }
                
            
        }
    }
}

    