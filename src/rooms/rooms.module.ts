import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Room} from "./room.model";
import {Hotel} from "../hotels/hotel.model";

@Module({
  providers: [RoomsService],
  controllers: [RoomsController],
  imports: [
      SequelizeModule.forFeature([Room, Hotel]),
  ],
})
export class RoomsModule {}
