import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {
  @ApiProperty({
    description: 'Rate',
    example: 10,
  })
  readonly rate: number;

  @ApiProperty({
    description: 'Message',
    example: 'Nice hotel, like it',
  })
  readonly message: string;

  @ApiProperty({
    description: 'ID пользователя, оставившего отзыв',
    example: 1,
  })
  readonly userId: number;

  @ApiProperty({
    description: 'ID отеля, на который оставлен отзыв',
    example: 1,
  })
  readonly hotelId: number;
}
