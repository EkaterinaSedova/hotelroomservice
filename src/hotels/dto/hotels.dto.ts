import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHotelDto {
  @ApiProperty({
    description: 'Hotel name',
    example: 'SUPER NAME 10/10',
  })
  readonly name: string;

  @ApiProperty({
    description: 'Hotel description',
    example: 'We love our clients and watermelons',
  })
  readonly description: string;

  @ApiPropertyOptional({
    description: 'Images',
    type: 'string',
    format: 'binary',
  })
  readonly images: string[];

  @ApiProperty({
    description: 'Hotel star rating',
    example: 5,
  })
  readonly starRating: number;

  @ApiProperty({
    description: 'Hotel contacts',
    example: 'MTS +375333218691',
  })
  readonly contacts: string;

  @ApiProperty({
    description: 'Address ID',
    example: 1,
  })
  readonly addressId: string;
}

export class HotelDto {
  @ApiProperty({
    description: 'Hotel ID',
    example: 1,
  })
  readonly id: string;

  @ApiPropertyOptional({
    description: 'Hotel name',
    example: 'SUPER NAME 10/10',
  })
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Hotel description',
    example: 'We love our clients and watermelons',
  })
  readonly description: string;

  @ApiPropertyOptional({
    description: 'Images',
    type: 'string',
    format: 'binary',
  })
  readonly images: string[];

  @ApiPropertyOptional({
    description: 'Hotel star rating',
    example: 5,
  })
  readonly starRating: number;

  @ApiPropertyOptional({
    description: 'Hotel contacts',
    example: 'MTS +375333218691',
  })
  readonly contacts: string;
}

export class HotelParamsDto {
  @ApiProperty({
    description: 'id',
  })
  id: number;
}

export class GetHotelsQueryDto {
  @ApiPropertyOptional({
    description: 'Country',
  })
  country: string;

  @ApiPropertyOptional({
    description: 'City',
  })
  city: string;

  @ApiProperty({
    description: 'limit',
  })
  limit: number;

  @ApiProperty({
    description: 'page',
  })
  page: number;

  @ApiPropertyOptional({
    description: 'hotel name',
  })
  name: string;
}
