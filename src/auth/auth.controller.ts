import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Login user',
  })
  @ApiResponse({
    status: 201,
    description: 'Success',
  })
  @ApiUnauthorizedResponse({
    description: 'Bad request',
  })
  @Post('/login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({
    summary: 'Register user',
  })
  @ApiOkResponse({
    description: 'Success',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
