import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Room} from "./room.model";
import {Hotel} from "../hotels/hotel.model";
import {FilesModule} from "../files/files.module";

@Module({
  providers: [RoomsService],
  controllers: [RoomsController],
  imports: [
      SequelizeModule.forFeature([Room, Hotel]),
      FilesModule
  ],
})
export class RoomsModule {}
