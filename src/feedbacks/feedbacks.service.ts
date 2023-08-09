import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
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

    async deleteFeedback(id) {
        const feedback = await this.feedbackRepository.destroy({where: {id}});
        if (!feedback) throw new HttpException("Feedback not found", HttpStatus.BAD_REQUEST);
        return {message: "Feedback successfully deleted"};
    }

}
