import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import {Booking} from "./booking.model";
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
  providers: [BookingsService],
  controllers: [BookingsController],
  imports: [
    SequelizeModule.forFeature([Booking]),
  ]
})
export class BookingsModule {}
