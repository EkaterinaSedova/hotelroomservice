import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Address} from "./address.model";
import {CreateAddressDto} from "./dto/create-address.dto";
import {Room} from "../rooms/room.model";
import {Sequelize} from "sequelize-typescript";
import {QueryTypes} from "sequelize";

@Injectable()
export class AddressService {
    constructor(@InjectModel(Address) private addressRepository: typeof Address,
                private sequelize: Sequelize) {
    }

    async createAddress(dto: CreateAddressDto) {
        const address = await this.addressRepository.create(dto);
        return address;
    }

    async getRoomsByCity(query, page) {
        const limit = 10;
        const offset = page * limit - limit;
        if(query.price === 'desc') {
            const rooms = await this.sequelize.query(`
                SELECT rooms.id, rooms."options", rooms.hotel_id, rooms.address_id  
                FROM rooms, addresses 
                WHERE addresses.id = rooms.address_id 
                  AND addresses.city LIKE '${query.city}'
                  AND rooms."options"->>'fridge' LIKE '${query.fridge}'
                  AND rooms."options"->>'places' LIKE '${query.places}'
                ORDER BY rooms."options"->'price' DESC
                LIMIT ${limit}
                OFFSET ${offset}
                `,
                {
                    plain: false,
                    type: QueryTypes.SELECT
                })
            return rooms;
        }
        const rooms = await this.sequelize.query(`
                SELECT rooms.id, rooms."options", rooms.hotel_id, rooms.address_id  
                FROM rooms, addresses 
                WHERE addresses.id = rooms.address_id 
                  AND addresses.city LIKE '${query.city}'
                  AND rooms."options"->>'fridge' LIKE '${query.fridge}'
                  AND rooms."options"->>'places' LIKE '${query.places}'
                ORDER BY rooms."options"->'price'
                LIMIT ${limit}
                OFFSET ${offset}
                `,
            {
                plain: false,
                type: QueryTypes.SELECT
            })
        return rooms;
    }

    async getRoomsByCountry(query, page) {
        const limit = 10;
        const offset = page * limit - limit;
        if(query.price === 'desc') {
            const rooms = await this.sequelize.query(`
                SELECT rooms.id, rooms."options", rooms.hotel_id, rooms.address_id  
                FROM rooms, addresses 
                WHERE addresses.id = rooms.address_id 
                  AND addresses.country LIKE '${query.country}' 
                  AND rooms."options"->>'fridge' LIKE '${query.fridge}'
                  AND rooms."options"->>'places' LIKE '${query.places}'
                ORDER BY rooms."options"->'price' DESC
                LIMIT ${limit}
                OFFSET ${offset}
                `,
                {
                    plain: false,
                    type: QueryTypes.SELECT
                })
            return rooms;
        }
        const rooms = await this.sequelize.query(`
                SELECT rooms.id, rooms."options", rooms.hotel_id, rooms.address_id  
                FROM rooms, addresses 
                WHERE addresses.id = rooms.address_id 
                  AND addresses.country LIKE '${query.country}' 
                  AND rooms."options"->>'fridge' LIKE '${query.fridge}'
                  AND rooms."options"->>'places' LIKE '${query.places}'
                ORDER BY rooms."options"->'price'
                LIMIT ${limit}
                OFFSET ${offset}
                `,
            {
                plain: false,
                type: QueryTypes.SELECT
            })
        return rooms;
    }

}
