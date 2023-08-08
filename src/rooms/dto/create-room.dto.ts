import {ApiProperty} from "@nestjs/swagger";

export class CreateRoomDto {

    @ApiProperty({
        description: 'Options',
    })
    readonly options: object;

    @ApiProperty({
        description: 'Hotel ID',
    })
    readonly hotelId: number;

    @ApiProperty({
        description: 'Address ID',
    })
    readonly addressId: number;

}