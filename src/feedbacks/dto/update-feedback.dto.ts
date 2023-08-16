import {ApiProperty, ApiPropertyOptional, ApiTags} from "@nestjs/swagger";

export class UpdateFeedbackDto {

    @ApiProperty({
        description: 'Feedback ID',
        example: 1
    })
    readonly id: number;

    @ApiPropertyOptional({
        description: 'Rate',
        example: 10
    })
    readonly rate: number;

    @ApiPropertyOptional({
        description: 'Message',
        example: 'Nice hotel, like it'
    })
    readonly message: string;
}