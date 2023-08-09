import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { User } from "./users/user.model";
import { HotelsModule } from './hotels/hotels.module';
import {Hotel} from "./hotels/hotel.model";
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import {Feedback} from "./feedbacks/feedback.model";
import { RoomsModule } from './rooms/rooms.module';
import { BookingsModule } from './bookings/bookings.module';
import {Room} from "./rooms/room.model";
import {Booking} from "./bookings/booking.model";
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import {Address} from "./address/address.model";
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Hotel, Feedback, Room, Booking, Address],
      autoLoadModels: true,
    }),
    UsersModule,
    HotelsModule,
    FeedbacksModule,
    RoomsModule,
    BookingsModule,
    AuthModule,
    AddressModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
