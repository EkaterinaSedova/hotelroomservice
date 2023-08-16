import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {CreateUserDto} from "./dto/create-user.dto";
import * as http from "http";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,) {}

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

    async changeRole(id) {
        const candidate = await this.userRepository.findByPk(id);
        if(!candidate) throw new HttpException('User with such ID not found', HttpStatus.BAD_REQUEST);
        const user = await this.userRepository.update({
            isAdmin: !candidate.isAdmin
        }, {where: {id}})
        return {message: 'Successfully updated'};
    }

    async updateUsername(dto: UpdateUserDto) {
        const candidate = await this.userRepository.update({
            name: dto.name
        }, {where: {id: dto.id}});
        if(!candidate) throw new HttpException('User with such ID not found', HttpStatus.BAD_REQUEST);
        return {message: 'Successfully updated'}
    }
}
