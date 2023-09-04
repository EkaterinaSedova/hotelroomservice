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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam, ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { HotelsService } from './hotels.service';
import { Hotel } from './hotel.model';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@ApiTags('Hotel')
@Controller('hotels')
export class HotelsController {
  constructor(private hotelsService: HotelsService) {}
  @ApiOperation({ summary: 'Create hotel' })
  @ApiCreatedResponse({ type: Hotel })
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @UseInterceptors(FilesInterceptor('images'))
  @Post()
  create(@Body() hotelDto: CreateHotelDto, @UploadedFiles() images) {
    return this.hotelsService.createHotel(hotelDto, images);
  }

  @ApiOperation({
    summary: 'Get hotel by ID',
  })
  @ApiOkResponse({
    description: 'Success',
  })
  @ApiBadRequestResponse({
    description: 'Bad request: hotel not found',
  })
  @ApiParam({
    name: 'id',
    description: 'Gets the hotel id',
  })
  @Get('/hotel/:id')
  getHotelById(@Param() params: any) {
    return this.hotelsService.getHotelById(params.id);
  }

  @ApiOperation({
    summary: 'Delete hotel',
  })
  @ApiParam({
    name: 'id',
    description: 'Hotel ID',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete('/:id')
  deleteHotel(@Param() params: any) {
    return this.hotelsService.deleteHotel(params.id);
  }

  @ApiOperation({ summary: 'Update hotel' })
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @UseInterceptors(FilesInterceptor('images'))
  @Post('/update')
  updateHotel(@Body() dto: UpdateHotelDto, @UploadedFiles() images) {
    return this.hotelsService.updateHotel(dto, images);
  }

  @ApiOperation({
    summary: 'Get hotels',
  })
  @ApiQuery({
    name: 'country',
    description: 'Country',
    required: false,
  })
  @ApiQuery({
    name: 'city',
    description: 'City',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'limit of elements on page',
    required: false,
  })
  @ApiQuery({
    name: 'name',
    description: 'name of the hotel',
    required: false,
  })
  @ApiParam({
    name: 'page',
    description: 'Current page',
  })
  @Get('/:page')
  getHotels(@Param() params: any, @Query() query: any) {
    return this.hotelsService.getHotels(query, params.page);
  }
}
