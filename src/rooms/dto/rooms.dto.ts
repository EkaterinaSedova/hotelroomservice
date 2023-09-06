import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RoomDto {
  @ApiProperty({
    description: 'Room ID',
    example: 1,
  })
  readonly id: number;

  @ApiPropertyOptional({
    description: 'Options',
    example: {
      places: 3,
      fridge: true,
      price: 30,
    },
  })
  readonly options: string;

  @ApiPropertyOptional({
    description: 'Images',
    type: 'string',
    format: 'binary',
  })
  readonly images: string[];
}
export class CreateRoomDto {
  @ApiProperty({
    description: 'Options',
    example: {
      places: 3,
      fridge: true,
      price: 30,
    },
  })
  readonly options: string;

  @ApiPropertyOptional({
    description: 'Images',
    type: 'string',
    format: 'binary',
  })
  readonly images: any[];

  @ApiProperty({
    description: 'Hotel ID',
    example: 1,
  })
  readonly hotelId: number;

  @ApiPropertyOptional({
    description: 'Address ID',
    example: 1,
  })
  readonly addressId: number;
}

export class AvailableRoomsQueryDto {
  @ApiProperty({
    description: 'page',
  })
  page: number;
  @ApiProperty({
    description: 'In date',
  })
  inDate: Date;

  @ApiProperty({
    description: 'Out date',
  })
  outDate: Date;

  @ApiPropertyOptional({
    description: 'country',
  })
  country: string;

  @ApiPropertyOptional({
    description: 'city',
  })
  city: string;

  @ApiPropertyOptional({
    description: 'places',
  })
  places: number;

  @ApiPropertyOptional({
    description: 'fridge',
  })
  fridge: boolean;

  @ApiPropertyOptional({
    description: 'price',
  })
  price: string;

  @ApiProperty({
    description: 'limit',
  })
  limit: number;

  @ApiPropertyOptional({
    description: 'hotel id',
  })
  hotelId: number;
}

export class DeleteRoomParamsDto {
  @ApiProperty({
    description: 'id',
  })
  id: number;
}

export class FindRoomsInHotelQueryDto {
  @ApiProperty({
    description: 'hotelId',
  })
  hotelId: number;

  @ApiProperty({
    description: 'page',
  })
  page: number;
  @ApiProperty({
    description: 'limit',
  })
  limit: number;
}

export class GetRoomParamsDto {
  @ApiProperty({
    description: 'id',
  })
  id: number;
}

export class GetAllRoomsQueryDto {
  @ApiProperty({
    description: 'page',
  })
  page: number;
  @ApiProperty({
    description: 'limit',
  })
  limit: number;
}
