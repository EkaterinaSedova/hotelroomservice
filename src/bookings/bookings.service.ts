import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './booking.model';
import {CreateBookingDto} from "./dto/bookings.dto";

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking) private bookingRepository: typeof Booking,
  ) {}

  async createBooking(dto: CreateBookingDto) {
    return await this.bookingRepository.create(dto);
  }

  async deleteBooking(id) {
    const booking = await this.bookingRepository.destroy({ where: { id } });
    if (!booking)
      throw new HttpException('Booking not found', HttpStatus.BAD_REQUEST);
    return { message: 'Booking successfully deleted' };
  }

  async getBookingsByRoomId(roomId) {
    return await this.bookingRepository.findAll({
      where: { roomId },
    });
  }

  async getBookingsByHotelId(hotelId) {
    return await this.bookingRepository.findAll({
      where: { hotelId },
    });
  }

  async getBookingsOfUser(userId) {
    return await this.bookingRepository.findAll({ where: { userId } });
  }
}
