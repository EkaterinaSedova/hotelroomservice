import {Body, Controller, Post} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
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
}
