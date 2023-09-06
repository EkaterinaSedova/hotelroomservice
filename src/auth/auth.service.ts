import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.model';
import {CreateUserDto, LoginUserDto} from "../users/dto/user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByLogin(userDto.login);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  //генерация токена (хранит в себе id)
  private async generateToken(user: User) {
    const payload = { id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  //проверка данных, введённых пользователем при логине
  private async validateUser(userDto: LoginUserDto) {
    const user = await this.usersService.getUserByLogin(userDto.login);
    if (!user)
      throw new UnauthorizedException({ message: 'Некорректный login' });
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Некорректный пароль' });
  }
}
