import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Hotel} from "./hotel.model";
import {Room} from "../rooms/room.model";
import {FilesModule} from "../files/files.module";

@Module({
  controllers: [HotelsController],
  providers: [HotelsService],
  imports: [
    SequelizeModule.forFeature([Hotel, Room]),
      FilesModule
  ],
  exports: [
      HotelsService
  ]
})
export class HotelsModule {}
