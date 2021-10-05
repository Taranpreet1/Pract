import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto{

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    // @Matches(/^[a-zA-Z][a-zA-Z\\s]+$/)
    // @Matches(/^([a-zA-Z]+\s?)*$/)
    username:string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { 
        message: 'Password Must Contain Atleast One UpperCase And Atleast One Special Charactor',})
    password:string;


}
