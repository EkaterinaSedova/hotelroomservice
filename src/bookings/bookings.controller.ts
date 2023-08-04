import {Body, Controller, Post} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
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
    create(@Body() dto: CreateBookingDto) {
        return this.bookingsService.createBooking(dto);
    }

}
