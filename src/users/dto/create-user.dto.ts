import {IsBoolean, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description: 'Login',
        example: 'user123'
    })
    readonly login: string;

    @ApiProperty({
        description: 'Password',
        example: 'qwerty123'
    })
    readonly password: string;

    @ApiProperty({
        description: 'Name',
        example: 'Ekaterina Sedova'
    })
    @IsString({message: "Имя должно быть строкой"})
    readonly name: string;

    @ApiProperty({
        description: 'Is Admin?',
        example: true
    })
    @IsBoolean({message: "Допустимы значения типа boolean"})
    readonly isAdmin: boolean;
}