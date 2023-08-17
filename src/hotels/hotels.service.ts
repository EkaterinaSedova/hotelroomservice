import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Hotel } from './hotel.model';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { Room } from '../rooms/room.model';
import { FilesService } from '../files/files.service';
import { Booking } from '../bookings/booking.model';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel) private hotelRepository: typeof Hotel,
    @InjectModel(Room) private roomRepository: typeof Room,
    @InjectModel(Booking) private bookingRepository: typeof Booking,
    private fileService: FilesService,
  ) {}

  async createHotel(dto: CreateHotelDto, images: any[]) {
    const fileNames = [];
    for (let i = 0; i < images.length; i++) {
      fileNames.push(await this.fileService.createImage(images[i]));
    }
    const hotel = await this.hotelRepository.create({
      ...dto,
      images: fileNames,
    });
    return hotel;
  }

  async getHotelById(id) {
    const hotel = await this.hotelRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!hotel)
      throw new HttpException('Hotel not found', HttpStatus.BAD_REQUEST);
    return hotel;
  }

  async getAllHotels(page) {
    const limit = 2;
    const offset = page * limit - limit;
    const hotels = await this.hotelRepository.findAll({
      limit,
      offset,
      include: { all: true },
      where: {},
    });
    return hotels;
  }

  async findAddressByHotelId(id) {
    const hotel = await this.hotelRepository.findOne({
      where: { id },
    });
    return hotel.addressId;
  }

  async deleteHotel(id) {
    const hotel = await this.hotelRepository.destroy({ where: { id } });
    await this.roomRepository.destroy({ where: { hotelId: id } });
    await this.bookingRepository.destroy({
      where: { hotelId: id },
    });
    if (!hotel)
      throw new HttpException('Hotel not found', HttpStatus.BAD_REQUEST);
    return { message: 'Hotel successfully deleted' };
  }

  async updateHotel(dto: UpdateHotelDto, images: any[]) {
    let fileNames = [];
    for (let i = 0; i < images.length; i++) {
      fileNames.push(await this.fileService.createImage(images[i]));
    }
    if (!fileNames.length) fileNames = null;
    const candidate = await this.hotelRepository.findByPk(dto.id);
    if (!candidate)
      throw new HttpException(
        'Hotel with such ID not found',
        HttpStatus.BAD_REQUEST,
      );
    await this.hotelRepository.update(
      {
        name: dto.name || candidate.name,
        description: dto.description || candidate.description,
        images: fileNames || candidate.images,
        contacts: dto.contacts || candidate.contacts,
        starRating: dto.starRating || candidate.starRating,
      },
      { where: { id: dto.id } },
    );
    return { message: 'Successfully updated' };
  }
}
