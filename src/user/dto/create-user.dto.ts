import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID, Matches, MaxLength, MinLength } from "class-validator";
import { PrimaryGeneratedColumn, Unique } from "typeorm";

export class CreateUserDto{

    // @IsNotEmpty()
    // user_id: string;

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^([a-zA-Z]+\s?)*$/)
    username:string;

    @IsNotEmpty()
    email:string

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { 
        message: 'Password Must Contain Atleast One UpperCase And Atleast One Special Charactor',})
    password:string;

    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(10)
    phone_no:string;


    @IsNotEmpty()
    role_id;

    // @IsUUID()
    created_by:string;

    @ApiPropertyOptional({
		type: "string",
		format: "binary",
		description: "profile Picture Url (Allow Only 'JPG,JPEG,PNG')",
		example: "profile.jpg",
	})
    profile_pic: string;











}
