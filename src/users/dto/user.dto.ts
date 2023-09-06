import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class AuthResponse {
  @ApiProperty({
    description: 'token',
  })
  token: string;
}
export class UserDto {
  @ApiProperty({
    description: 'ID',
    example: 1,
  })
  readonly id: number;
  @ApiProperty({
    description: 'Login',
    example: 'user123',
  })
  readonly login: string;

  @ApiProperty({
    description: 'Password',
    example: 'qwerty123',
  })
  readonly password: string;
  @ApiProperty({
    description: 'Name',
    example: 'Ekaterina Sedova',
  })
  @IsString({ message: 'Имя должно быть строкой' })
  readonly name: string;
  @ApiProperty({
    description: 'Is Admin?',
    example: true,
  })
  @IsBoolean({ message: 'Допустимы значения типа boolean' })
  readonly isAdmin: boolean;
}
export class ChangeUserroleDto {
  @ApiProperty({
    description: 'ID',
    example: 1,
  })
  readonly id: number;
  @ApiProperty({
    description: 'Login',
    example: 'user123',
  })
  readonly login: string;

  @ApiProperty({
    description: 'Password',
    example: 'qwerty123',
  })
  readonly password: string;
}

export class CreateUserDto {
  @ApiProperty({
    description: 'Login',
    example: 'user123',
  })
  readonly login: string;

  @ApiProperty({
    description: 'Password',
    example: 'qwerty123',
  })
  readonly password: string;

  @ApiProperty({
    description: 'Name',
    example: 'Ekaterina Sedova',
  })
  @IsString({ message: 'Имя должно быть строкой' })
  readonly name: string;

  @ApiProperty({
    description: 'Is Admin?',
    example: true,
  })
  @IsBoolean({ message: 'Допустимы значения типа boolean' })
  readonly isAdmin: boolean;
}

export class LoginUserDto {
  @ApiProperty({
    description: 'Login',
    example: 'user123',
  })
  readonly login: string;
  @ApiProperty({
    description: 'Password',
    example: 'qwerty123',
  })
  readonly password: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'ID',
    example: 1,
  })
  readonly id: number;

  @ApiPropertyOptional({
    description: 'Name',
    example: 'Ekaterina Sedova',
  })
  @IsString({ message: 'Имя должно быть строкой' })
  readonly name: string;
}

export class GetUserParamsDto {
  @ApiProperty({
    description: 'id',
  })
  id: number;
}

export class GetUserQueryDto {
  @ApiProperty({
    description: 'name',
  })
  name: string;
}
