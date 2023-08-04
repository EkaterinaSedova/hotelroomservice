import {ApiProperty, ApiTags} from "@nestjs/swagger";

export class CreateFeedbackDto {
    @ApiProperty({
        description: 'Rate',
    })
    readonly rate: number;

    @ApiProperty({
        description: 'Message',
    })
    readonly message: string;

    @ApiProperty({
        description: 'ID пользователя, оставившего отзыв'
    })
    readonly userId: number;

    @ApiProperty({
        description: 'ID отеля, на который оставлен отзыв'
    })
    readonly hotelId: number;
}