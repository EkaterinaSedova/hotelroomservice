import {Body, Controller, Post} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {HotelsService} from "./hotels.service";
import {Hotel} from "./hotel.model";
import {CreateHotelDto} from "./dto/create-hotel.dto";

@ApiTags('Hotel')
@Controller('hotels')
export class HotelsController {
    constructor(private hotelsService: HotelsService) {
    }
    @ApiOperation({summary: 'Create hotel'})
    @ApiCreatedResponse({type: Hotel})
    @Post()
    create(@Body() hotelDto: CreateHotelDto) {
        return this.hotelsService.createHotel(hotelDto);
    }

}
