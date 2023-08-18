import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse, ApiOkResponse,
  ApiOperation,
  ApiParam, ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Room } from './room.model';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateRoomDto } from './dto/update-room.dto';

@ApiTags('Room')
@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @ApiOperation({ summary: 'Create room' })
  @ApiCreatedResponse({ type: Room })
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @UseInterceptors(FilesInterceptor('images'))
  @Post()
  create(@Body() dto: CreateRoomDto, @UploadedFiles() images) {
    return this.roomsService.createRoom(dto, images);
  }

  @ApiOperation({
    summary: 'Delete room',
  })
  @ApiParam({
    name: 'id',
    description: 'Room ID',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete('/:id')
  deleteRoom(@Param() params: any) {
    return this.roomsService.deleteRoom(params.id);
  }

  @ApiOperation({
    summary: 'Get room in hotel by hotel ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Hotel ID',
  })
  @Get('/hotel/:id')
  getRoomsByHotelId(@Param() params: any) {
    return this.roomsService.getRoomsByHotelId(params.id);
  }

  @ApiOperation({
    summary: 'Update room',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  @Post('/update')
  updateRoom(@Body() dto: UpdateRoomDto, @UploadedFiles() images) {
    return this.roomsService.updateRoom(dto, images);
  }

  @ApiOperation({
    summary: 'Get room by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Room ID',
  })
  @Get('/:id')
  getRoom(@Param() params: any) {
    return this.roomsService.getRoomById(params.id);
  }

  @ApiOperation({
    summary: 'Get rooms',
  })
  @ApiOkResponse({
    description: 'Success',
  })
  @ApiQuery({
    name: 'inDate',
    description: 'in date',
  })
  @ApiQuery({
    name: 'outDate',
    description: 'out date',
  })
  @ApiParam({
    name: 'page',
    description: 'Current page',
  })
  @ApiQuery({
    name: 'city',
    description: 'Current city',
    required: false,
  })
  @ApiQuery({
    name: 'country',
    description: 'Current country',
    required: false,
  })
  @ApiQuery({
    name: 'places',
    description: 'Places in room',
    required: false,
  })
  @ApiQuery({
    name: 'fridge',
    description: 'Is there a fridge in room? (true/false)',
    required: false,
  })
  @ApiQuery({
    name: 'price',
    description: 'asc/desc',
    required: false,
  })
  @Get('/:page')
  getRooms(@Param() params: any, @Query() query: any) {
    return this.roomsService.getRooms(query, params.page);
  }
}
