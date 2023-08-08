import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {AddressService} from "./address.service";
import {ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery} from "@nestjs/swagger";
import {Address} from "./address.model";
import {CreateAddressDto} from "./dto/create-address.dto";

@Controller('address')
export class AddressController {
    constructor(private addressesService: AddressService) {
    }

    @ApiOperation({
        summary: 'Create address'
    })
    @ApiCreatedResponse({type: Address})
    @Post()
    create(@Body() dto: CreateAddressDto) {
        return this.addressesService.createAddress(dto);
    }

    @ApiOperation({
        summary: 'Get rooms in current city'
    })
    @ApiOkResponse({
        description: 'Success'
    })
    @ApiParam({
        name: 'page',
        description: 'Current page',
    })
    @ApiQuery({
        name: 'city',
        description: 'Current city'
    })
    @ApiQuery({
        name: 'places',
        description: 'Places in room'
    })
    @ApiQuery({
        name: 'fridge',
        description: 'Is there a fridge in room? (true/false)'
    })
    @ApiQuery({
        name: 'price',
        description: 'asc/desc'
    })
    @Get('/rooms/city/:page')
    getRoomsByCity(@Param() params: any, @Query() query: any) {
        return this.addressesService.getRoomsByCity(query, params.page)
    }


    @ApiOperation({
        summary: 'Get rooms in current country'
    })
    @ApiOkResponse({
        description: 'Success'
    })
    @ApiParam({
        name: 'page',
        description: 'Current page',
    })
    @ApiQuery({
        name: 'country',
        description: 'Current country'
    })
    @ApiQuery({
        name: 'places',
        description: 'Places in room'
    })
    @ApiQuery({
        name: 'fridge',
        description: 'Is there a fridge in room? (true/false)'
    })
    @ApiQuery({
        name: 'price',
        description: 'asc/desc'
    })
    @Get('/rooms/country/:page')
    getRoomsByCountry(@Param() params: any, @Query() query: any) {
        return this.addressesService.getRoomsByCountry(query, params.page)
    }
}
