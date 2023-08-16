import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class UpdateRoomDto {

    @ApiProperty({
        description: 'Room ID',
        example: 1
    })
    readonly id: number;

    @ApiPropertyOptional({
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

}