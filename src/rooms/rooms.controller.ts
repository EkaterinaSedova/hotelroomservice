import {Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles} from '@nestjs/common';
import {RoomsService} from "./rooms.service";
import {CreateRoomDto} from "./dto/create-room.dto";
import {
    ApiBadRequestResponse, ApiConsumes,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags
} from "@nestjs/swagger";
import {Room} from "./room.model";

@ApiTags('Room')
@Controller('rooms')
export class RoomsController {
    constructor(private roomsService: RoomsService) {
    }

    @ApiOperation({summary: 'Create room'})
    @ApiCreatedResponse({type: Room})
    @ApiConsumes('multipart/form-data')
    @Post()
    create(@Body() dto: CreateRoomDto,
           @UploadedFiles() images) {
        return this.roomsService.createRoom(dto, images)
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
    getRooms(@Param() params: any, @Query() query: any) {
        return this.roomsService.getAllRooms(params, query);
    }

    @ApiParam({
        name: 'id',
        description: 'Room ID',
    })
    @Delete('/:id')
    deleteRoom(@Param() params: any) {
        return this.roomsService.deleteRoom(params.id)
    }
}
