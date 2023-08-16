import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {FeedbacksService} from "./feedbacks.service";
import {ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {Feedback} from "./feedback.model";
import {CreateFeedbackDto} from "./dto/create-feedback.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags('Feedback')
@Controller('feedbacks')
export class FeedbacksController {

    constructor(private feedbacksService: FeedbacksService) {
    }

    @ApiOperation({summary: 'Create feedback'})
    @ApiCreatedResponse({type: Feedback})
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @Post()
    createFeedback(@Body() dto: CreateFeedbackDto) {
        return this.feedbacksService.createFeedback(dto);
    }

    @ApiOperation({summary: 'Delete feedback'})
    @ApiParam({
        name: 'id',
        description: 'Feedback ID'
    })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @Delete('/:id')
    deleteFeedback(@Param() params: any) {
        return this.feedbacksService.deleteFeedback(params.id);
    }

    @ApiOperation({summary: 'Get average rating of hotel'})
    @ApiParam({
        name: 'hotelId',
        description: 'Hotel ID'
    })
    @Get('/avg/:hotelId')
    getAverageRating(@Param() params: any) {
        return this.feedbacksService.getAverageRating(params.hotelId)
    }

    @ApiOperation({summary: 'Gets feedbacks by hotel ID'})
    @ApiParam({
        name: 'hotelId',
        description: 'Hotel ID'
    })
    @Get('/:hotelId')
    getFeedbackByHotelId(@Param() params: any) {
        return this.feedbacksService.getFeedbackByHotelId(params.hotelId)
    }


}
