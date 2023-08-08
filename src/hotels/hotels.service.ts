import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Hotel} from "./hotel.model";
import {CreateHotelDto} from "./dto/create-hotel.dto";
import {Address} from "../address/address.model";
import {Room} from "../rooms/room.model";

@Injectable()
export class HotelsService {
    constructor(@InjectModel(Hotel) private hotelRepository: typeof Hotel,
                @InjectModel(Room) private roomRepository: typeof Room

    ) {}

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
        const hotels = await this.hotelRepository.findAll({
            limit,
            offset,
            include: {all: true},
            where: {

            }
        });
        return hotels;
    }

    async findAddressByHotelId(id) {
        const hotel = await this.hotelRepository.findOne({
            where: {id}
        });
        return hotel.addressId;
    }

    async deleteHotel(id) {
        const hotel = await this.hotelRepository.destroy({where: {id}})
        const rooms = await this.roomRepository.destroy({where: {hotelId: id}})
        if(!hotel) throw new HttpException("Hotel not found", HttpStatus.BAD_REQUEST);
        return {message: 'Hotel successfully deleted'}
    }

}
