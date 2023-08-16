import {ApiProperty} from "@nestjs/swagger";

export class CreateAddressDto {

    @ApiProperty({
        description: 'Country',
        example: 'Belarus'
    })
    readonly country: string;

    @ApiProperty({
        description: 'City',
        example: 'Grodno'
    })
    readonly city: string;

    @ApiProperty({
        description: 'Address',
        example: 'Sovietskaya, 5'
    })
    readonly address: string;
}