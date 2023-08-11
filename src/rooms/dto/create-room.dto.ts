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
    readonly options: string;

    @ApiPropertyOptional({
        description: 'Images',
        type: 'string',
        format: 'binary'
    })
    readonly images: string[];

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