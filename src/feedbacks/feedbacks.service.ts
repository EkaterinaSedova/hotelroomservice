import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Feedback} from "./feedback.model";
import {CreateFeedbackDto} from "./dto/create-feedback.dto";

@Injectable()
export class FeedbacksService {

    constructor(@InjectModel(Feedback) private feedbackRepository: typeof Feedback) {
    }

    async createFeedback(dto: CreateFeedbackDto) {
        const feedback = await this.feedbackRepository.create(dto);
        return feedback;
    }
}
