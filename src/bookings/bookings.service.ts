import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './booking.model';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking) private bookingRepository: typeof Booking,
  ) {}

  async createBooking(dto: CreateBookingDto) {
    const booking = await this.bookingRepository.create(dto);
    return booking;
  }

  async deleteBooking(id) {
    const booking = await this.bookingRepository.destroy({ where: { id } });
    if (!booking)
      throw new HttpException('Booking not found', HttpStatus.BAD_REQUEST);
    return { message: 'Booking successfully deleted' };
  }

  async getBookingsByRoomId(roomId) {
    const bookings = await this.bookingRepository.findAll({
      where: { roomId },
    });
    return bookings;
  }

  async getBookingsByHotelId(hotelId) {
    const bookings = await this.bookingRepository.findAll({
      where: { hotelId },
    });
    return bookings;
  }
}
