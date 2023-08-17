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
