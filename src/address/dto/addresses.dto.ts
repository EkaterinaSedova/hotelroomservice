import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Country',
    example: 'Belarus',
  })
  readonly country: string;

  @ApiProperty({
    description: 'City',
    example: 'Grodno',
  })
  readonly city: string;

  @ApiProperty({
    description: 'Address',
    example: 'Sovietskaya, 5',
  })
  readonly address: string;
}
export class AddressDto {
  @ApiProperty({
    description: 'Address ID',
    example: 1,
  })
  readonly id: number;

  @ApiPropertyOptional({
    description: 'Country',
    example: 'Belarus',
  })
  readonly country: string;

  @ApiPropertyOptional({
    description: 'City',
    example: 'Grodno',
  })
  readonly city: string;

  @ApiPropertyOptional({
    description: 'Address',
    example: 'Ozheshko, 22',
  })
  readonly address: string;
}

export class AddressParamsDto {
  @ApiProperty({
    description: 'address id',
  })
  id: number;
}
