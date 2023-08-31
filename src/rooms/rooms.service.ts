import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './room.model';
import { CreateRoomDto } from './dto/create-room.dto';
import { Hotel } from '../hotels/hotel.model';
import { FilesService } from '../files/files.service';
import { Booking } from '../bookings/booking.model';
import { UpdateRoomDto } from './dto/update-room.dto';
import {QueryTypes} from "sequelize";
import {Sequelize} from "sequelize-typescript";

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room) private roomRepository: typeof Room,
    @InjectModel(Hotel) private hotelRepository: typeof Hotel,
    @InjectModel(Booking) private bookingRepository: typeof Booking,
    private fileService: FilesService,
    private sequelize: Sequelize,
  ) {}

  async createRoom(dto: CreateRoomDto, images: any[]) {
    const hotel = await this.hotelRepository.findOne({
      where: { id: dto.hotelId },
    });
    const addressId = hotel.addressId;
    const fileNames = [];
    for (let i = 0; i < images.length; i++) {
      fileNames.push(await this.fileService.createImage(images[i]));
    }
    const optionsJSON = JSON.parse(dto.options);
    return await this.roomRepository.create({
      ...dto,
      options: optionsJSON,
      addressId: addressId,
      images: fileNames,
    });
  }

  async deleteRoom(id) {
    const room = await this.roomRepository.destroy({ where: { id } });
    if (!room)
      throw new HttpException('Room not found', HttpStatus.BAD_REQUEST);
    await this.bookingRepository.destroy({
      where: { roomId: id },
    });
    return { message: 'Room successfully deleted' };
  }

  async getRoomById(id) {
    return this.roomRepository.findByPk(id, { include: { all: true } });
  }

  async getAvailableRooms(query, page) {
    const limit = query.limit;
    const offset = page * limit - limit;
    let sql = `SELECT rooms.id, rooms."options", rooms.images, rooms.hotel_id AS "hotelId"
            FROM rooms
            LEFT JOIN bookings 
	        ON rooms.id = bookings.room_id AND (
		        ('${query.inDate}' BETWEEN bookings.in_date AND bookings.out_date
                AND '${query.outDate}' BETWEEN bookings.in_date AND bookings.out_date)
                OR
                (bookings.in_date BETWEEN '${query.inDate}' AND '${query.outDate}'
                OR bookings.out_date BETWEEN '${query.inDate}' AND '${query.outDate}')
	            ),
	        addresses
            WHERE addresses.id = rooms.address_id AND bookings.id IS NULL`;
    if(query.hotelId) sql += ` AND rooms.hotel_id = ${query.hotelId}`
    if (query.country) sql += ` AND addresses.country LIKE '${query.country}'`;
    if (query.city) sql += ` AND addresses.city LIKE '${query.city}'`;
    if (query.fridge)
      sql += ` AND rooms."options"->>'fridge' LIKE '${query.fridge}'`;
    if (query.places)
      sql += ` AND rooms."options"->>'places' LIKE '${query.places}'`;
    if (query.price === 'desc')
      sql += ` ORDER BY rooms."options"->'price' DESC
                    LIMIT ${limit}
                    OFFSET ${offset}`;
    else
      sql += ` ORDER BY rooms."options"->'price'
                    LIMIT ${limit}
                    OFFSET ${offset}`;
    return await this.sequelize.query(sql, {
      plain: false,
      type: QueryTypes.SELECT,
    });
  }

  async getAllRooms(page, limit) {
    const offset = limit * page - limit;
    return this.roomRepository.findAll({limit, offset, include: {all: true}});
  }

  async getRoomsByHotelId(hotelId, page, limit) {
    const offset = limit * page - limit;
    return await this.roomRepository.findAll({ limit, offset, where: { hotelId } });
  }

  async updateRoom(dto: UpdateRoomDto, images: any[]) {
    const candidate = await this.roomRepository.findByPk(dto.id);
    if (!candidate)
      throw new HttpException(
        'Address with such ID not found',
        HttpStatus.BAD_REQUEST,
      );
    let fileNames = [];
    for (let i = 0; i < images.length; i++) {
      fileNames.push(await this.fileService.createImage(images[i]));
    }
    if (!fileNames.length) fileNames = null;
    let optionsJSON = null;
    if (dto.options) optionsJSON = JSON.parse(dto.options);
    await this.roomRepository.update(
      {
        options: optionsJSON || candidate.options,
        images: fileNames || candidate.images,
      },
      { where: { id: dto.id } },
    );

    return { message: 'Successfully updated' };
  }
}
