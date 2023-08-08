import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Room} from "./room.model";
import {AddressModule} from "../address/address.module";
import {HotelsModule} from "../hotels/hotels.module";

@Module({
  providers: [RoomsService],
  controllers: [RoomsController],
  imports: [
      SequelizeModule.forFeature([Room]),
      AddressModule,
      HotelsModule,
  ],
  exports: [
    RoomsService,
  ]
})
export class RoomsModule {}
