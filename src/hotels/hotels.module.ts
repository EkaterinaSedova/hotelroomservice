import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Hotel} from "./hotel.model";
import {Room} from "../rooms/room.model";
import {FilesModule} from "../files/files.module";
import {Booking} from "../bookings/booking.model";

@Module({
  controllers: [HotelsController],
  providers: [HotelsService],
  imports: [
    SequelizeModule.forFeature([Hotel, Room, Booking]),
      FilesModule
  ],
  exports: [
      HotelsService
  ]
})
export class HotelsModule {}
