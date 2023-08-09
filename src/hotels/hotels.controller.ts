import {Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiConsumes,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam, ApiProperty,
    ApiTags
} from "@nestjs/swagger";
import {HotelsService} from "./hotels.service";
import {Hotel} from "./hotel.model";
import {CreateHotelDto} from "./dto/create-hotel.dto";
import {FilesInterceptor} from "@nestjs/platform-express";

@ApiTags('Hotel')
@Controller('hotels')
export class HotelsController {
    constructor(private hotelsService: HotelsService) {
    }
    @ApiOperation({summary: 'Create hotel'})
    @ApiCreatedResponse({type: Hotel})
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('images'))
    @Post()
    create(@Body() hotelDto: CreateHotelDto,
           @UploadedFiles() images) {
        return this.hotelsService.createHotel(hotelDto, images);
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


    @ApiParam({
        name: 'id',
        description: 'Hotel ID'
    })
    @Delete('/:id')
    deleteHotel(@Param() params: any) {
        return this.hotelsService.deleteHotel(params.id);
    }
}
