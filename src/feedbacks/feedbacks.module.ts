import { Module } from '@nestjs/common';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Feedback} from "./feedback.model";

@Module({
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
  imports: [
    SequelizeModule.forFeature([Feedback])
  ],
})
export class FeedbacksModule {}
