import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({
    description: 'Дата заезда',
    example: new Date(2023, 10, 12),
  })
  readonly inDate: Date;

  @ApiProperty({
    description: 'Дата выезда',
    example: new Date(2023, 10, 15),
  })
  readonly outDate: Date;

  @ApiProperty({
    description: 'ID бронирующего юзера',
    example: 1,
  })
  readonly userId: number;

  @ApiProperty({
    description: 'ID бронируемой комнаты',
    example: 1,
  })
  readonly roomId: number;

  @ApiProperty({
    description: 'ID бронируемого отеля',
    example: 1,
  })
  readonly hotelId: number;
}

export class BookingDto {
  @ApiProperty({
    description: 'id',
    example: 1,
  })
  readonly id: number;
  @ApiProperty({
    description: 'Дата заезда',
    example: new Date(2023, 10, 12),
  })
  readonly inDate: Date;

  @ApiProperty({
    description: 'Дата выезда',
    example: new Date(2023, 10, 15),
  })
  readonly outDate: Date;

  @ApiProperty({
    description: 'ID бронирующего юзера',
    example: 1,
  })
  readonly userId: number;

  @ApiProperty({
    description: 'ID бронируемой комнаты',
    example: 1,
  })
  readonly roomId: number;

  @ApiProperty({
    description: 'ID бронируемого отеля',
    example: 1,
  })
  readonly hotelId: number;
}

export class BookingIdParamDto {
  @ApiProperty({
    description: 'booking id',
  })
  id: number;
}
export class HotelIdParamDto {
  @ApiProperty({
    description: 'hotel id',
  })
  id: number;
}

export class RoomIdParamDto {
  @ApiProperty({
    description: 'room id',
  })
  id: number;
}

export class UserIdParamDto {
  @ApiProperty({
    description: 'user id',
  })
  id: number;
}
