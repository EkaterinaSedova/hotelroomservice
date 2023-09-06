import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  AvailableRoomsQueryDto,
  CreateRoomDto,
  DeleteRoomParamsDto,
  FindRoomsInHotelQueryDto,
  GetAllRoomsQueryDto,
  GetRoomParamsDto,
  RoomDto,
} from './dto/rooms.dto';

@ApiTags('Room')
@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @ApiOperation({ summary: 'Create room' })
  @ApiCreatedResponse({
    description: 'Room object',
    type: RoomDto,
  })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
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
  @ApiOkResponse({
    description: 'Room successfully deleted',
  })
  @ApiBadRequestResponse({ description: 'Room not found' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete('/:id')
  deleteRoom(@Param() params: DeleteRoomParamsDto) {
    return this.roomsService.deleteRoom(params.id);
  }

  @ApiOperation({
    summary: 'Get room in hotel by hotel ID',
  })
  @ApiOkResponse({
    description: 'Array of rooms',
    type: RoomDto,
    isArray: true,
  })
  @Get('/hotel')
  getRoomsByHotelId(@Query() query: FindRoomsInHotelQueryDto) {
    return this.roomsService.getRoomsByHotelId(query);
  }

  @ApiOperation({
    summary: 'Update room',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBadRequestResponse({
    description: 'Room with such ID not found',
  })
  @ApiOkResponse({
    description: 'Successfully updated',
  })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  @Post('/update')
  updateRoom(@Body() dto: RoomDto, @UploadedFiles() images) {
    return this.roomsService.updateRoom(dto, images);
  }

  @ApiOperation({
    summary: 'Get room by ID',
  })
  @ApiOkResponse({
    description: 'Room object',
    type: RoomDto,
  })
  @Get('/room/:id')
  getRoom(@Param() params: GetRoomParamsDto) {
    return this.roomsService.getRoomById(params.id);
  }

  @ApiOperation({
    summary: 'Get available rooms',
  })
  @ApiOkResponse({
    description: 'Array of rooms',
    type: RoomDto,
    isArray: true,
  })
  @Get('/')
  getAvailableRooms(@Query() query: AvailableRoomsQueryDto) {
    return this.roomsService.getAvailableRooms(query);
  }

  @ApiOperation({
    summary: 'Get all rooms',
  })
  @ApiOkResponse({
    description: 'Array of rooms',
    type: RoomDto,
    isArray: true,
  })
  @Get('/all')
  getAllRooms(@Query() query: GetAllRoomsQueryDto) {
    return this.roomsService.getAllRooms(query);
  }
}
