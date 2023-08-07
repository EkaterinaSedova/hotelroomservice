import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags
} from "@nestjs/swagger";
import {UsersService} from "./users.service";
import {User} from "./user.model";
import {CreateUserDto} from "./dto/create-user.dto";

@ApiTags('User')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @ApiOperation({summary: 'Create user'})
    @ApiCreatedResponse({type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({
        summary: 'Get user by ID'
    })
    @ApiOkResponse({
        description: 'Success'
    })
    @ApiBadRequestResponse({
        description: 'Bad request: user not found'
    })
    @ApiParam({
        name: 'id',
        description: 'Gets the user id',
    })
    @Get('/:id')
    getUserById(@Param() params: any) {
        return this.usersService.getUserById(params.id);
    }
}
