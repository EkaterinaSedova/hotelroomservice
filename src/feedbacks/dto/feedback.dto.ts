import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

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
export class FeedbackDto {
    @ApiProperty({
        description: 'Feedback ID',
        example: 1,
    })
    readonly id: number;

    @ApiPropertyOptional({
        description: 'Rate',
        example: 10,
    })
    rate: number;

    @ApiPropertyOptional({
        description: 'Message',
        example: 'Nice hotel, like it',
    })
    readonly message: string;
}

export class AverageRatingDto {
    @ApiProperty({
        description: 'avg rating',
        example: '6.875'
    })
    averageRating: number;
}

export class DeleteFeedbackParamsDto {
    @ApiProperty({
        description: 'id'
    })
    id: number;
}

export class HotelIdParam {
    @ApiProperty({
        description: 'hotel id'
    })
    hotelId: number;
}
