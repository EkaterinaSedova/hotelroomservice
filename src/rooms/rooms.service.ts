import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Room} from "./room.model";
import {CreateRoomDto} from "./dto/create-room.dto";
import {HotelsService} from "../hotels/hotels.service";

@Injectable()
export class RoomsService {

    constructor(@InjectModel(Room) private roomRepository: typeof Room,
                private hotelsService: HotelsService) {
    }

    async createRoom(dto: CreateRoomDto) {
        const addressId = await this.hotelsService.findAddressByHotelId(dto.hotelId);
        const room = await this.roomRepository.create({...dto, addressId: addressId})
        return room;
    }

    async getAllRooms(params, query) {
        const limit = 2;
        const places = query.places;
        const fridge = query.fridge;
        const offset = params.page * limit - limit;
        if (query.fridge != null) {
            const rooms = await this.roomRepository.findAll({
                where: {
                    options: {
                        places: places,
                        fridge: fridge
                    }
                },
                limit,
                offset,
                order: [['options.price', 'ASC']]
            })
            return rooms;
        }
        const rooms = await this.roomRepository.findAll({
            where: {
                options: {
                    places: places,
                }
            },
            limit,
            offset,
            order: [['options.price', 'ASC']],
            include: {all: true}
        })
        return rooms;
    }

}
