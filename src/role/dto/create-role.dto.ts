import {IsEnum, IsNotEmpty, IsNumber, IsString} from 'class-validator'
import { UserRole } from '../../enum/user-role.enum';
export class CreateRoleDto{

    id;
    
    @IsEnum(UserRole)
    @IsNotEmpty()
    role:string;

}