import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  AuthResponse,
  CreateUserDto,
  LoginUserDto,
} from '../users/dto/user.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Login user',
  })
  @ApiResponse({
    status: 201,
    description: 'Token',
    type: AuthResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Некорректный login/Некорректный пароль',
  })
  @Post('/login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({
    summary: 'Register user',
  })
  @ApiOkResponse({
    description: 'Token',
    type: AuthResponse,
  })
  @ApiBadRequestResponse({
    description: 'Пользователь с таким email уже существует',
  })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
