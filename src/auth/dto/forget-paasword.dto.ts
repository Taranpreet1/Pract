import { IsNotEmpty, IsEmail, ValidationArguments } from "class-validator";

export class ForgetPasswordDto {

    
    @IsEmail()
    email: string;

}