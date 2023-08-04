import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Hotel} from "./hotel.model";

@Module({
  controllers: [HotelsController],
  providers: [HotelsService],
  imports: [
    SequelizeModule.forFeature([Hotel])
  ],
  exports: [
      HotelsService
  ]
})
export class HotelsModule {}
