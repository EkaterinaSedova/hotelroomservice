import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class UpdateHotelDto {
    @ApiProperty({
        description: 'Hotel ID',
        example: 1
    })
    readonly id: string;

    @ApiPropertyOptional({
        description: 'Hotel name',
        example: 'SUPER NAME 10/10'
    })
    readonly name: string;

    @ApiPropertyOptional({
        description: 'Hotel description',
        example: 'We love our clients and watermelons'
    })
    readonly description: string;

    @ApiPropertyOptional({
        description: 'Images',
        type: 'string',
        format: 'binary'
    })
    readonly images: string[];

    @ApiPropertyOptional({
        description: 'Hotel star rating',
        example: 5
    })
    readonly starRating: number;

    @ApiPropertyOptional({
        description: 'Hotel contacts',
        example: 'MTS +375333218691'
    })
    readonly contacts: string;
}