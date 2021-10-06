import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { User } from 'src/entity/user.entity';
import { UserRole } from 'src/enum/user-role.enum';
import { Roles } from 'src/decorator/role.decorator';
import { RolesGuard } from 'src/guard/role.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ProfilePicDto } from 'src/user/dto/profile-pic.dto';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { editFileName, imageFileFilter } from './dto/file-validator';
import { ForgetPasswordDto } from './dto/forget-paasword.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { GetUser } from '../decorator/get-user.decorator';
import { SiteUrl } from 'src/decorator/site-url.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Sign-up new account of admin' })
  @ApiResponse({ status: 200, description: 'Api success' })
  @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
  @ApiResponse({ status: 404, description: 'Not found!' })
  @ApiResponse({ status: 409, description: 'User Already Exist' })
  @ApiResponse({ status: 500, description: 'Internal server error!' })
  @HttpCode(200)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'profile_pic', maxCount: 1 }], {
      storage: diskStorage({
        destination: './assets/profile',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 2097152 },
    }),
  )
  signUp(
    @Body() createUserDto: CreateUserDto,
    @UploadedFiles() files: ProfilePicDto,
    @Req() req,
    @Headers('wl_code') wlCode: any = 1,
  ): Promise<void> {
    return this.authService.signUp(createUserDto, files);
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Sign-in to your account of Admin/user' })
  @ApiResponse({ status: 200, description: 'Api success' })
  @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
  @ApiResponse({ status: 404, description: 'Not found!' })
  @ApiResponse({ status: 409, description: 'User Already Exist' })
  @ApiResponse({ status: 500, description: 'Internal server error!' })
  @HttpCode(200)
  signin(
    @Body() authCredentialdto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialdto);
  }

  @Get()
  // @UseGuards(AuthGuard(), RolesGuard)
  // @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all accounts of user' })
  @ApiResponse({ status: 200, description: 'Api success' })
  @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
  @ApiResponse({ status: 404, description: 'Not found!' })
  @ApiResponse({ status: 409, description: 'User Already Exist' })
  @ApiResponse({ status: 500, description: 'Internal server error!' })
  @HttpCode(200)
  getUser(): Promise<User[]> {
    return this.authService.getUser();
  }

  @Post('/forget-password')
  @ApiOperation({ summary: 'Forget password of your account' })
  @ApiResponse({ status: 200, description: 'Api success' })
  @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
  @ApiResponse({ status: 404, description: 'Not found!' })
  @ApiResponse({ status: 409, description: 'User Already Exist' })
  @ApiResponse({ status: 500, description: 'Internal server error!' })
  @HttpCode(200)
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return await this.authService.forgetPassword(forgetPasswordDto);
  }

  @Post('/reset-password')
  @ApiOperation({ summary: 'Reset password of yhour account' })
  @ApiResponse({ status: 200, description: 'Api success' })
  @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
  @ApiResponse({ status: 404, description: 'Not found!' })
  @ApiResponse({ status: 409, description: 'User Already Exist' })
  @ApiResponse({ status: 500, description: 'Internal server error!' })
  @HttpCode(200)
  async updatePassword(
    @Query() updatePasswordDto: UpdatePasswordDto,
    @Body() newPasswordDto: NewPasswordDto,
  ) {
    return this.authService.updatePassword(updatePasswordDto, newPasswordDto);
  }

  @Post('/create-user')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'create new account for user' })
  @ApiResponse({ status: 200, description: 'Api success' })
  @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
  @ApiResponse({ status: 404, description: 'Not found!' })
  @ApiResponse({ status: 409, description: 'User Already Exist' })
  @ApiResponse({ status: 500, description: 'Internal server error!' })
  @HttpCode(200)
  createUser(
    @Body() createUserDto: CreateUserDto,
    @GetUser() user: User, //the logged_in user_id is store in created_by field
  ): Promise<void> {
    return this.authService.createUser(createUserDto, user);
  }


  // @Get("/profile")
	// @ApiOperation({ summary: "Get Profile Details" })
	// @HttpCode(200)
	// @ApiResponse({ status: 200, description: "Api success" })
	// @ApiResponse({ status: 401, description: "Please login to continue." })
	// @ApiResponse({ status: 406, description: "Please Verify Your Email Id" })
	// @ApiResponse({ status: 422, description: "Bad Request or API error message" })
	// @ApiResponse({
	// 	status: 404,
	// 	description:
	// 		"User Details not found!, [Invalid user id! Please enter correct user id]",
	// })
	// @ApiResponse({ status: 500, description: "Internal server error!" })
	// async getProfile(@GetUser() user: User, @SiteUrl() siteUrl: string) {
	// 	return await this.authService.getProfile(user, siteUrl);
	// }
}



