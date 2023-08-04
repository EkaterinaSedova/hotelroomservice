import {ApiProperty} from "@nestjs/swagger";

export class CreateBookingDto {

    @ApiProperty({
        description: 'Дата заезда'
    })
    readonly inDate: string;

    @ApiProperty({
        description: 'Дата выезда'
    })
    readonly outDate: string;

    @ApiProperty({
        description: 'ID бронирующего юзера'
    })
    readonly userId: number;

    @ApiProperty({
        description: 'ID бронируемой комнаты'
    })
    readonly roomId: number;

    @ApiProperty({
        description: 'ID бронируемого отеля'
    })
    readonly hotelId: number;
}