import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from './address.model';
import { Room } from '../rooms/room.model';
import { Hotel } from '../hotels/hotel.model';
import {AddressDto, CreateAddressDto} from "./dto/addresses.dto";

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address) private addressRepository: typeof Address,
    @InjectModel(Room) private roomRepository: typeof Room,
    @InjectModel(Hotel) private hotelRepository: typeof Hotel,
  ) {}

  async createAddress(dto: CreateAddressDto) {
    return await this.addressRepository.create(dto);
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



  async updateAddress(dto: AddressDto) {
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
