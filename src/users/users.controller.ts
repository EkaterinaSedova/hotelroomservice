import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangeUserroleDto } from './dto/change-userrole.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({
    summary: 'Get user by ID',
  })
  @ApiOkResponse({
    description: 'Success',
  })
  @ApiBadRequestResponse({
    description: 'Bad request: user not found',
  })
  @ApiParam({
    name: 'id',
    description: 'Gets the user id',
  })
  @Get('/:id')
  getUserById(@Param() params: any) {
    return this.usersService.getUserById(params.id);
  }

  @ApiOperation({
    summary: 'Change role of User with current ID',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/changeRole')
  changeRole(@Body() dto: ChangeUserroleDto) {
    return this.usersService.changeRole(dto.id);
  }

  @ApiOperation({
    summary: 'Update username',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/update')
  updateUser(@Body() dto: UpdateUserDto) {
    return this.usersService.updateUsername(dto);
  }
}
