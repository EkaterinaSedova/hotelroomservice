import {Body, Controller, Post} from '@nestjs/common';
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
}
