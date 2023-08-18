import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from './address.model';
import { CreateAddressDto } from './dto/create-address.dto';
import { Room } from '../rooms/room.model';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { Hotel } from '../hotels/hotel.model';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address) private addressRepository: typeof Address,
    @InjectModel(Room) private roomRepository: typeof Room,
    @InjectModel(Hotel) private hotelRepository: typeof Hotel,
    private sequelize: Sequelize,
  ) {}

  async createAddress(dto: CreateAddressDto) {
    return await this.addressRepository.create(dto);
  }


  async getRooms(query, page) {
    const limit = 10;
    const offset = page * limit - limit;
    let sql = `SELECT rooms.id, rooms."options", rooms.images
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
            WHERE addresses.id = rooms.address_id and bookings.id IS NULL`;
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

  async deleteAddress(id) {
    const addressId = id;
    const address = await this.addressRepository.destroy({ where: { id } });
    await this.hotelRepository.destroy({ where: { addressId } });
    await this.roomRepository.destroy({ where: { addressId } });
    if (!address)
      throw new HttpException('Address not found', HttpStatus.BAD_REQUEST);
    return { message: 'Address successfully deleted' };
  }

  async getHotels(query, page) {
    const limit = 10;
    const offset = page * limit - limit;
    let sql = `SELECT hotels.id, hotels."name", hotels.description, hotels.star_rating, hotels.contacts
                 FROM hotels,
                      addresses
                 WHERE addresses.id = hotels.address_id`;
    if (query.country) sql += ` AND addresses.country LIKE '${query.country}'`;
    if (query.city) sql += ` AND addresses.city LIKE '${query.city}'`;
    sql += ` LIMIT ${limit} OFFSET ${offset}`;
    return await this.sequelize.query(sql, {
      plain: false,
      type: QueryTypes.SELECT,
    });
  }

  async updateAddress(dto: UpdateAddressDto) {
    const candidate = await this.addressRepository.findByPk(dto.id);
    if (!candidate)
      throw new HttpException(
        'Address with such ID not found',
        HttpStatus.BAD_REQUEST,
      );
    await this.addressRepository.update(
      {
        country: dto.country || candidate.country,
        city: dto.city || candidate.city,
        address: dto.address || candidate.address,
      },
      { where: { id: dto.id } },
    );

    return { message: 'Successfully updated' };
  }
}
