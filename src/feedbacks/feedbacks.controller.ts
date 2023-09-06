import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  AverageRatingDto,
  CreateFeedbackDto,
  DeleteFeedbackParamsDto,
  FeedbackDto,
  HotelIdParam,
} from './dto/feedback.dto';

@ApiTags('Feedback')
@Controller('feedbacks')
export class FeedbacksController {
  constructor(private feedbacksService: FeedbacksService) {}

  @ApiOperation({ summary: 'Create feedback' })
  @ApiCreatedResponse({
    description: 'Feedback object',
    type: FeedbackDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post()
  createFeedback(@Body() dto: CreateFeedbackDto) {
    return this.feedbacksService.createFeedback(dto);
  }

  @ApiOperation({ summary: 'Delete feedback' })
  @ApiBadRequestResponse({
    description: 'Feedback not found',
  })
  @ApiOkResponse({
    description: 'Feedback successfully deleted',
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete('/:id')
  deleteFeedback(@Param() params: DeleteFeedbackParamsDto) {
    return this.feedbacksService.deleteFeedback(params.id);
  }

  @ApiOperation({ summary: 'Get average rating of hotel' })
  @ApiOkResponse({
    description: 'average rating of hotel',
    type: AverageRatingDto,
  })
  @Get('/avg/:hotelId')
  getAverageRating(@Param() params: HotelIdParam) {
    return this.feedbacksService.getAverageRating(params.hotelId);
  }

  @ApiOperation({ summary: 'Gets feedbacks by hotel ID' })
  @ApiOkResponse({
    description: 'Array of feedbacks',
    type: FeedbackDto,
    isArray: true,
  })
  @Get('/:hotelId')
  getFeedbackByHotelId(@Param() params: HotelIdParam) {
    return this.feedbacksService.getFeedbackByHotelId(params.hotelId);
  }

  @ApiOperation({ summary: 'Update feedback' })
  @ApiOkResponse({
    description: 'Successfully updated',
  })
  @ApiBadRequestResponse({
    description: 'Feedback with such ID not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/update')
  updateFeedback(@Body() dto: FeedbackDto) {
    return this.feedbacksService.updateFeedback(dto);
  }
}
