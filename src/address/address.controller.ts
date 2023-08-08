import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {AddressService} from "./address.service";
import {ApiCreatedResponse, ApiOperation} from "@nestjs/swagger";
import {Address} from "./address.model";
import {CreateAddressDto} from "./dto/create-address.dto";

@Controller('address')
export class AddressController {
    constructor(private addressesService: AddressService) {
    }

    @ApiOperation({summary: 'Create address'})
    @ApiCreatedResponse({type: Address})
    @Post()
    create(@Body() dto: CreateAddressDto) {
        return this.addressesService.createAddress(dto);
    }

    @Get('/rooms/city/:city')
    getRoomsByCity(@Param() params: any) {
        return this.addressesService.getRoomsByCity(params.city)
    }

    @Get('/rooms/country/:country')
    getRoomsByCountry(@Param() params: any) {
        return this.addressesService.getRoomsByCountry(params.country)
    }
}
