import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.model';
import {ChangeUserroleDto, GetUserParamsDto, GetUserQueryDto, UpdateUserDto, UserDto} from "./dto/user.dto";

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({
    summary: 'Get user by ID',
  })
  @ApiOkResponse({
    description: 'User object',
    type: UserDto,
  })
  @ApiBadRequestResponse({
    description: 'User with such ID not found',
  })
  @Get('/:id')
  getUserById(@Param() params: GetUserParamsDto) {
    return this.usersService.getUserById(params.id);
  }

  @ApiOperation({
    summary: 'Change role of User with current ID',
  })
  @ApiOkResponse({
    description: 'Successfully updated'
  })
  @ApiBadRequestResponse({
    description: 'User with such ID not found'
  })
  @Post('/changeRole')
  changeRole(@Body() dto: ChangeUserroleDto) {
    return this.usersService.changeRole(dto.id);
  }

  @ApiOperation({
    summary: 'Update username',
  })
  @ApiOkResponse({
    description: 'Successfully updated'
  })
  @ApiBadRequestResponse({
    description: 'User with such ID not found'
  })
  @Post('/update')
  updateUser(@Body() dto: UpdateUserDto) {
    return this.usersService.updateUsername(dto);
  }


  @ApiOperation({
    summary: 'Get user by name'
  })
  @ApiOkResponse({
    description: 'Array of users',
    type: UserDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'User not found'
  })
  @Get('/')
  getUserByName(@Query() params: GetUserQueryDto) {
    return this.usersService.getUserByName('%' + params.name + '%');
  }
}
