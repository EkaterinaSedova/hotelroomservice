import {ApiProperty} from "@nestjs/swagger";

export class CreateRoomDto {

    @ApiProperty({
        description: 'options',
    })
    readonly options: object;

    @ApiProperty({
        description: 'Hotel id',
    })
    readonly hotelId: string;

}