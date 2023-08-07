import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {CreateUserDto} from "./dto/create-user.dto";
import * as http from "http";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getUserByLogin(login) {
        const user = await this.userRepository.findOne({where: {login}})
        return user;
    }

    async getUserById(id) {
        const user = await this.userRepository.findOne({where: {id}})
        if (!user) throw new HttpException("User not found", HttpStatus.BAD_REQUEST)
        return user;
    }
}
