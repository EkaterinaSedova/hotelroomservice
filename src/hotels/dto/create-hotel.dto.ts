import {ApiProperty} from "@nestjs/swagger";

export class CreateHotelDto {

    @ApiProperty({
        description: 'Hotel name',
    })
    readonly name: string;

    @ApiProperty({
        description: 'Hotel description',
    })
    readonly description: string;

    @ApiProperty({
        description: 'Hotel address',
    })
    readonly address: string;

    @ApiProperty({
        description: 'Hotel star rating'
    })
    readonly starRating: number;

    @ApiProperty({
        description: 'Hotel contacts'
    })
    readonly contacts: string;
}