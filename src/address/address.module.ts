import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Address} from "./address.model";

@Module({
  controllers: [AddressController],
  providers: [AddressService],
  imports: [
    SequelizeModule.forFeature([Address])
  ],
  exports: [
    AddressService
  ]
})
export class AddressModule {}
