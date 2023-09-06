import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse, ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  BookingDto,
  BookingIdParamDto,
  CreateBookingDto,
  HotelIdParamDto,
  RoomIdParamDto,
  UserIdParamDto
} from "./dto/bookings.dto";

@ApiTags('Booking')
@ApiUnauthorizedResponse({
  description: 'Пользователь не авторизован'
})
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @ApiOperation({ summary: 'Create booking' })
  @ApiCreatedResponse({
    description: 'Booking object',
    type: BookingDto
  })
  @Post()
  createBooking(@Body() dto: CreateBookingDto) {
    return this.bookingsService.createBooking(dto);
  }

  @ApiOperation({
    summary: 'Delete booking',
  })
  @ApiOkResponse({
    description: 'Booking successfully deleted'
  })
  @ApiBadRequestResponse({
    description: 'Booking not found'
  })
  @Delete('/:id')
  deleteBooking(@Param() params: BookingIdParamDto) {
    return this.bookingsService.deleteBooking(params.id);
  }

  @ApiOperation({
    summary: 'Get bookings in current hotel',
  })
  @ApiOkResponse({
    description: 'Array of bookings',
    type: BookingDto,
    isArray: true
  })
  @Get('/hotel/:id')
  getBookingsByHotel(@Param() params: HotelIdParamDto) {
    return this.bookingsService.getBookingsByHotelId(params.id);
  }

  @ApiOperation({
    summary: 'Get bookings in current room',
  })
  @ApiOkResponse({
    description: 'Array of bookings',
    type: BookingDto,
    isArray: true,
  })
  @Get('/room/:id')
  getBookingsByRoom(@Param() params: RoomIdParamDto) {
    return this.bookingsService.getBookingsByRoomId(params.id);
  }

  @ApiOperation({
    summary: "Get bookings of user by user's ID",
  })
  @ApiOkResponse({
    description: 'Array of bookings',
    type: BookingDto,
    isArray: true
  })
  @Get('/user/:id')
  getBookingsOfUser(@Param() params: UserIdParamDto) {
    return this.bookingsService.getBookingsOfUser(params.id);
  }
}
