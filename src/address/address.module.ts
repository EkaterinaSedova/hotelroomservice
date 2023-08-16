import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Address} from "./address.model";
import {HotelsModule} from "../hotels/hotels.module";
import {RoomsModule} from "../rooms/rooms.module";
import {Room} from "../rooms/room.model";
import {Hotel} from "../hotels/hotel.model";
import {JwtService} from "@nestjs/jwt";

@Module({
  controllers: [AddressController],
  providers: [AddressService, JwtService],
  imports: [
    SequelizeModule.forFeature([Address, Room, Hotel]),
  ],
})
export class AddressModule {}
