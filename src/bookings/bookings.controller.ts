import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {BookingsService} from "./bookings.service";
import {Booking} from "./booking.model";
import {CreateBookingDto} from "./dto/create-booking.dto";

@ApiTags('Booking')
@Controller('bookings')
export class BookingsController {

    constructor(private bookingsService: BookingsService) {
    }

    @ApiOperation({summary: 'Create booking'})
    @ApiCreatedResponse({type: Booking})
    @Post()
    createBooking(@Body() dto: CreateBookingDto) {
        return this.bookingsService.createBooking(dto);
    }


    @ApiParam({
        name: 'id',
        description: 'Booking ID'
    })
    @Delete('/:id')
    deleteBooking(@Param() params: any) {
        return this.bookingsService.deleteBooking(params.id)
    }

    @ApiParam({
        name: 'id',
        description: 'Hotel ID'
    })
    @Get('/hotel/:id')
    getBookingsByHotel(@Param() params: any) {
        return this.bookingsService.getBookingsByHotelId(params.id);
    }


    @ApiParam({
        name: 'id',
        description: 'Room ID'
    })
    @Get('/room/:id')
    getBookingsByRoom(@Param() params: any) {
        return this.bookingsService.getBookingsByRoomId(params.id);
    }

}
