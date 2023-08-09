import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
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
}