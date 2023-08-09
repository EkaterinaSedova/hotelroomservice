import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Room} from "./room.model";
import {Hotel} from "../hotels/hotel.model";
import {FilesModule} from "../files/files.module";
import {Booking} from "../bookings/booking.model";

@Module({
  providers: [RoomsService],
  controllers: [RoomsController],
  imports: [
      SequelizeModule.forFeature([Room, Hotel, Booking]),
      FilesModule
  ],
})
export class RoomsModule {}
