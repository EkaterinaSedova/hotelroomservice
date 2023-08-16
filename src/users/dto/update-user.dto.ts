import {IsBoolean, IsString} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class UpdateUserDto {

    @ApiProperty({
        description: 'ID',
        example: 1
    })
    readonly id: number;

    @ApiPropertyOptional({
        description: 'Name',
        example: 'Ekaterina Sedova'
    })
    @IsString({message: "Имя должно быть строкой"})
    readonly name: string;
}