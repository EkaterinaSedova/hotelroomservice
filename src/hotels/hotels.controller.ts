import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags
} from "@nestjs/swagger";
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

    @ApiOperation({
        summary: 'Get hotel by ID'
    })
    @ApiOkResponse({
        description: 'Success'
    })
    @ApiBadRequestResponse({
        description: 'Bad request: hotel not found'
    })
    @ApiParam({
        name: 'id',
        description: 'Gets the hotel id',
    })
    @Get('/:id')
    getHotelById(@Param() params: any) {
        return this.hotelsService.getHotelById(params.id);
    }

    @ApiOperation({
        summary: 'Get hotels by current page'
    })
    @ApiOkResponse({
        description: 'Success'
    })
    @ApiBadRequestResponse({
        description: 'Bad request: hotel not found'
    })
    @ApiParam({
        name: 'page',
        description: 'Current page',
    })
    @Get('/page/:page')
    getHotels(@Param() params: any) {
        return this.hotelsService.getAllHotels(params.page);
    }

    @Delete('/:id')
    deleteHotel(@Param() params: any) {
        return this.hotelsService.deleteHotel(params.id);
    }
}
