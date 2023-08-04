import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({
        description: 'Login',
    })
    readonly login: string;
    @ApiProperty({
        description: 'Password',
    })
    readonly password: string;
}