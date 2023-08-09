import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateRoomDto {

    @ApiProperty({
        description: 'Options',
        example: {
            places: 3,
            fridge: true,
            price: 30,
        }
    })
    readonly options: object;

    @ApiProperty({
        description: 'Hotel ID',
        example: 1
    })
    readonly hotelId: number;

    @ApiPropertyOptional({
        description: 'Address ID',
        example: 1
    })
    readonly addressId: number;

}