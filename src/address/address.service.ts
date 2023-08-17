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

  async getRoomsByCity(query, page) {
    const limit = 10;
    const offset = page * limit - limit;
    if (query.price === 'desc') {
      return await this.sequelize.query(
        `
            SELECT rooms.id,
                CASE
                    WHEN EXISTS(
                        SELECT 1
                        FROM bookings
                            WHERE bookings.room_id = rooms.id
                              AND (
                                    ('${query.inDate}' BETWEEN bookings.in_date AND bookings.out_date
                                        AND '${query.outDate}' BETWEEN bookings.in_date AND bookings.out_date)
                                    OR
                                    (bookings.in_date BETWEEN '${query.inDate}' AND '${query.outDate}'
                                        OR bookings.out_date BETWEEN '${query.inDate}' AND '${query.outDate}')
                                )
                        ) THEN 'Not available'
                        ELSE 'Available'
                    END AS "availabilityStatus"
            FROM rooms, addresses
                WHERE addresses.id = rooms.address_id AND addresses.city LIKE '${query.city}'
                AND rooms."options"->>'fridge' LIKE '${query.fridge}'
                AND rooms."options"->>'places' LIKE '${query.places}'
            ORDER BY rooms."options"->'price' DESC
            LIMIT ${limit}
            OFFSET ${offset}
            `,
        {
          plain: false,
          type: QueryTypes.SELECT,
        },
      );
    }
    return await this.sequelize.query(
      `
                    SELECT rooms.id,
                           CASE
                               WHEN EXISTS(
                                       SELECT 1
                                       FROM bookings
                                       WHERE (bookings.room_id = rooms.id)
                                         AND (
                                               ('${query.inDate}' BETWEEN bookings.in_date AND bookings.out_date
                                                   AND '${query.outDate}' BETWEEN bookings.in_date AND bookings.out_date)
                                               OR
                                               (bookings.in_date BETWEEN '${query.inDate}' AND '${query.outDate}'
                                                   or bookings.out_date BETWEEN '${query.inDate}' AND '${query.outDate}')
                                           )
                                   ) THEN 'Not available'
                               ELSE 'Available'
                               END AS "availabilityStatus"
                    FROM rooms, addresses
                    WHERE addresses.id = rooms.address_id AND addresses.city LIKE '${query.city}'
                      AND rooms."options"->>'fridge' LIKE '${query.fridge}'
                      AND rooms."options"->>'places' LIKE '${query.places}'
                    ORDER BY rooms."options"->'price'
                    LIMIT ${limit}
                    OFFSET ${offset}
                `,
      {
        plain: false,
        type: QueryTypes.SELECT,
      },
    );
  }

  async getRoomsByCountry(query, page) {
    const limit = 10;
    const offset = page * limit - limit;
    if (query.price === 'desc') {
      return await this.sequelize.query(
        `
                        SELECT rooms.id,
                               CASE
                                   WHEN EXISTS(
                                           SELECT 1
                                           FROM bookings
                                           WHERE bookings.room_id = rooms.id
                                             AND (
                                                ('${query.inDate}' BETWEEN bookings.in_date AND bookings.out_date
                                                AND '${query.outDate}' BETWEEN bookings.in_date AND bookings.out_date)
                                                OR
                                                (bookings.in_date BETWEEN '${query.inDate}' and '${query.outDate}'
                                                or bookings.out_date BETWEEN '${query.inDate}' and '${query.outDate}')
                                                )
                                       ) THEN 'Not available'
                                   ELSE 'Available'
                                   END AS "availabilityStatus"
                        FROM rooms, addresses
                        WHERE addresses.id = rooms.address_id AND addresses.country LIKE '${query.country}'
                          AND rooms."options"->>'fridge' LIKE '${query.fridge}'
                          AND rooms."options"->>'places' LIKE '${query.places}'
                        ORDER BY rooms."options"->'price' DESC
                            LIMIT ${limit}
                        OFFSET ${offset}
                `,
        {
          plain: false,
          type: QueryTypes.SELECT,
        },
      );
    }
    return await this.sequelize.query(
      `
                    SELECT rooms.id,
                           CASE
                               WHEN EXISTS(
                                       SELECT 1
                                       FROM bookings
                                       WHERE bookings.room_id = rooms.id
                                         AND (
                                               ('${query.inDate}' BETWEEN bookings.in_date AND bookings.out_date
                                                   AND '${query.outDate}' BETWEEN bookings.in_date AND bookings.out_date)
                                               OR
                                               (bookings.in_date BETWEEN '${query.inDate}' and '${query.outDate}'
                                                or bookings.out_date BETWEEN '${query.inDate}' and '${query.outDate}')
                                           )
                                   ) THEN 'Not available'
                               ELSE 'Available'
                               END AS "availabilityStatus"
                    FROM rooms, addresses
                    WHERE addresses.id = rooms.address_id AND addresses.country LIKE '${query.country}'
                      AND rooms."options"->>'fridge' LIKE '${query.fridge}'
                      AND rooms."options"->>'places' LIKE '${query.places}'
                    ORDER BY rooms."options"->'price'
                        LIMIT ${limit}
                    OFFSET ${offset}
                `,
      {
        plain: false,
        type: QueryTypes.SELECT,
      },
    );
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

  async getHotelsByCountry(query, page) {
    const limit = 10;
    const offset = page * limit - limit;
    return await this.sequelize.query(
      `
                SELECT hotels.id, hotels."name", hotels.description, hotels.star_rating, hotels.contacts
                FROM hotels, addresses
                WHERE addresses.id = hotels.address_id
                  AND addresses.country LIKE '${query.country}' 
                LIMIT ${limit}
                OFFSET ${offset}
                `,
      {
        plain: false,
        type: QueryTypes.SELECT,
      },
    );
  }

  async getHotelsByCity(query, page) {
    const limit = 10;
    const offset = page * limit - limit;
    return await this.sequelize.query(
      `
                SELECT hotels.id, hotels."name", hotels.description, hotels.star_rating, hotels.contacts
                FROM hotels, addresses
                WHERE addresses.id = hotels.address_id
                  AND addresses.city LIKE '${query.city}' 
                LIMIT ${limit}
                OFFSET ${offset}
                `,
      {
        plain: false,
        type: QueryTypes.SELECT,
      },
    );
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
