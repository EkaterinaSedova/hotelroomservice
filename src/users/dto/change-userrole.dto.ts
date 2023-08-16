import {IsBoolean, IsString} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class ChangeUserroleDto {

    @ApiProperty({
        description: 'ID',
        example: 1
    })
    readonly id: number;
}