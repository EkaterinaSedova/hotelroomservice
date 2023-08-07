import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
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

    async getHotelById(id) {
        const hotel = await this.hotelRepository.findOne({where: {id}, include: {all: true}});
        if (!hotel) throw new HttpException("Hotel not found", HttpStatus.BAD_REQUEST);
        return hotel;
    }

    async getAllHotels(page) {
        const limit = 2;
        const offset = page * limit - limit;
        const hotels = await this.hotelRepository.findAll({limit, offset, include: {all: true}});
        return hotels;
    }

}
