import {IsBoolean, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description: 'Login',
    })
    readonly login: string;

    @ApiProperty({
        description: 'Password',
    })
    readonly password: string;

    @ApiProperty({
        description: 'Name',
    })
    @IsString({message: "Имя должно быть строкой"})
    readonly name: string;

    @ApiProperty({
        description: 'Is Admin?',
    })
    @IsBoolean({message: "Допустимы значения типа boolean"})
    readonly isAdmin: boolean;
}