import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Hotel} from "./hotel.model";
import {CreateHotelDto} from "./dto/create-hotel.dto";

@Injectable()
export class HotelsService {
    constructor(@InjectModel(Hotel) private hotelRepository: typeof Hotel) {}

    async createHotel(dto: CreateHotelDto) {
        const hotel = await this.hotelRepository.create(dto);
        return hotel;
    }

}
