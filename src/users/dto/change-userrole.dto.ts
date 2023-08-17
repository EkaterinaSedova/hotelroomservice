import { ApiProperty } from '@nestjs/swagger';

export class ChangeUserroleDto {
  @ApiProperty({
    description: 'ID',
    example: 1,
  })
  readonly id: number;
}
