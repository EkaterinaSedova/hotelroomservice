import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './booking.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [BookingsService, JwtService],
  controllers: [BookingsController],
  imports: [SequelizeModule.forFeature([Booking])],
})
export class BookingsModule {}
