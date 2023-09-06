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
import { HotelsService } from './hotels.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CreateHotelDto,
  GetHotelsQueryDto,
  HotelDto,
  HotelParamsDto,
} from './dto/hotels.dto';

@ApiTags('Hotel')
@Controller('hotels')
export class HotelsController {
  constructor(private hotelsService: HotelsService) {}
  @ApiOperation({ summary: 'Create hotel' })
  @ApiCreatedResponse({ description: 'Hotel object', type: HotelDto })
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
    description: 'Hotel object',
    type: HotelDto,
  })
  @ApiBadRequestResponse({
    description: 'Hotel not found',
  })
  @Get('/hotel/:id')
  getHotelById(@Param() params: HotelParamsDto) {
    return this.hotelsService.getHotelById(params.id);
  }

  @ApiOperation({
    summary: 'Delete hotel',
  })
  @ApiOkResponse({
    description: 'Hotel successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Hotel not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete('/:id')
  deleteHotel(@Param() params: HotelParamsDto) {
    return this.hotelsService.deleteHotel(params.id);
  }

  @ApiOperation({ summary: 'Update hotel' })
  @ApiOkResponse({
    description: 'Successfully updated',
  })
  @ApiBadRequestResponse({
    description: 'Hotel with such ID not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @UseInterceptors(FilesInterceptor('images'))
  @Post('/update')
  updateHotel(@Body() dto: HotelDto, @UploadedFiles() images) {
    return this.hotelsService.updateHotel(dto, images);
  }

  @ApiOperation({
    summary: 'Get hotels',
  })
  @ApiOkResponse({
    description: 'Array of hotels',
    type: HotelDto,
    isArray: true,
  })
  @Get('/')
  getHotels(@Query() query: GetHotelsQueryDto) {
    return this.hotelsService.getHotels(query);
  }
}
