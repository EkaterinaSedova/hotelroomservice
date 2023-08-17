import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAddressDto {
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
