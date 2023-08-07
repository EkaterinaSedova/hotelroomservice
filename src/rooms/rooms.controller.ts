import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {RoomsService} from "./rooms.service";
import {CreateRoomDto} from "./dto/create-room.dto";
import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiParam} from "@nestjs/swagger";

@Controller('rooms')
export class RoomsController {
    constructor(private roomsService: RoomsService) {
    }

    @Post()
    create(@Body() dto: CreateRoomDto) {
        return this.roomsService.createRoom(dto)
    }

    @ApiOperation({
        summary: 'Get room by current page'
    })
    @ApiOkResponse({
        description: 'Success'
    })
    @ApiParam({
        name: 'page',
        description: 'Current page',
    })
    @Get('/page/:page')
    getUserById(@Param() params: any, @Query() query: any) {
        return this.roomsService.getAll(params, query);
    }

}
