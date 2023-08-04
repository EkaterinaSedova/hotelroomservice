import {Body, Controller, Post} from '@nestjs/common';
import {FeedbacksService} from "./feedbacks.service";
import {ApiCreatedResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Feedback} from "./feedback.model";
import {CreateFeedbackDto} from "./dto/create-feedback.dto";

@ApiTags('Feedback')
@Controller('feedbacks')
export class FeedbacksController {

    constructor(private feedbacksService: FeedbacksService) {
    }

    @ApiOperation({summary: 'Create feedback'})
    @ApiCreatedResponse({type: Feedback})
    @Post()
    create(@Body() dto: CreateFeedbackDto) {
        return this.feedbacksService.createFeedback(dto);
    }

}
