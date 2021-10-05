import { IsNotEmpty, IsEmail, MinLength, MaxLength, Matches } from "class-validator";


export class UpdatePasswordDto {
    @IsNotEmpty()
    token:string;
}