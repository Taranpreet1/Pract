import { IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';
import { IsEqualTo } from 'src/password.decorator';

export class NewPasswordDto {
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Your password must be 8 characters long, should contain at least 1 uppercase, 1 lowercase, 1 numeric or special character.',
  })
  @MaxLength(20)
  @MinLength(8, {
    message: `Password is too short. It should be minimum 8 characters.`,
  })
  @IsNotEmpty({ message: 'Please enter your new password.&&&password' })
  new_password: string;

  @IsEqualTo('new_password')
  @IsNotEmpty({
    message: 'Please enter your confirm password.&&&confirm_password',
  })
  confirm_password: string;
}
