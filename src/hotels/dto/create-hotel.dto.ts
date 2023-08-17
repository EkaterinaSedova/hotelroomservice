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
