import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Booking} from "./booking.model";
import {CreateBookingDto} from "./dto/create-booking.dto";

@Injectable()
export class BookingsService {

    constructor(@InjectModel(Booking) private bookingRepository: typeof Booking) {
    }

    async createBooking(dto: CreateBookingDto) {
        const booking = await this.bookingRepository.create(dto);
        return booking;
    }

}
