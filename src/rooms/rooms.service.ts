import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Room} from "./room.model";
import {CreateRoomDto} from "./dto/create-room.dto";

@Injectable()
export class RoomsService {

    constructor(@InjectModel(Room) private roomRepository: typeof Room) {
    }

    async createRoom(dto: CreateRoomDto) {
        const room = await this.roomRepository.create(dto)
        return room;
    }

    async getAll(params, query) {
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
            order: [['options.price', 'ASC']]
        })
        return rooms;
    }

}
