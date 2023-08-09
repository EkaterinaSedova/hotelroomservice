import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Room} from "./room.model";
import {CreateRoomDto} from "./dto/create-room.dto";
import {HotelsService} from "../hotels/hotels.service";
import {Hotel} from "../hotels/hotel.model";
import {FilesService} from "../files/files.service";

@Injectable()
export class RoomsService {

    constructor(@InjectModel(Room) private roomRepository: typeof Room,
                @InjectModel(Hotel) private hotelRepository: typeof Hotel,
                private fileService: FilesService){
    }

    async createRoom(dto: CreateRoomDto, images: any[]) {
        const hotel = await this.hotelRepository.findOne({
            where: {id: dto.hotelId}
        });
        const addressId = hotel.addressId;
        let fileNames = [];
        for(let i = 0; i < images.length; i++)
        {
            fileNames.push(await this.fileService.createImage(images[i]));
        }
        const room = await this.roomRepository.create({...dto, addressId: addressId, images: fileNames});
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

    async deleteRoom(id) {
        const room = await this.roomRepository.destroy({where: {id}})
        if (!room) throw new HttpException("Room not found", HttpStatus.BAD_REQUEST);
        return {message: "Room successfully deleted"};
    }

}
