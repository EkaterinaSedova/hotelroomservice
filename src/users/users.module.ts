import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {JwtService} from "@nestjs/jwt";

@Module({
  providers: [UsersService, JwtService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User])
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}
