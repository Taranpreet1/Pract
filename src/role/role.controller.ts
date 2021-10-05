import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/entity/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';


@ApiTags('Role')
@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService, ) {}

    @Post('/create-role')

    @ApiOperation( { summary: "create new role of user" })
    @ApiResponse({ status: 200, description: "Api success" })
    @ApiResponse({ status: 422, description: "Bad Request or API error message" })
    @ApiResponse({ status: 404, description: "Not found!" })
    @ApiResponse({ status: 409, description: "User Already Exist" })
    @ApiResponse({ status: 500, description: "Internal server error!" })
    @HttpCode(200)

    createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
        return this.roleService.createRole(createRoleDto);
      }
    
}
