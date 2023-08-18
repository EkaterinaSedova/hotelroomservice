import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Address } from './address.model';
import { CreateAddressDto } from './dto/create-address.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private addressesService: AddressService) {}

  @ApiOperation({
    summary: 'Create address',
  })
  @ApiCreatedResponse({ type: Address })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post()
  create(@Body() dto: CreateAddressDto) {
    return this.addressesService.createAddress(dto);
  }

  @ApiTags('Room')
  @ApiOperation({
    summary: 'Get rooms',
  })
  @ApiOkResponse({
    description: 'Success',
  })
  @ApiQuery({
    name: 'inDate',
    description: 'in date',
  })
  @ApiQuery({
    name: 'outDate',
    description: 'out date',
  })
  @ApiParam({
    name: 'page',
    description: 'Current page',
  })
  @ApiQuery({
    name: 'city',
    description: 'Current city',
    required: false,
  })
  @ApiQuery({
    name: 'country',
    description: 'Current country',
    required: false,
  })
  @ApiQuery({
    name: 'places',
    description: 'Places in room',
    required: false,
  })
  @ApiQuery({
    name: 'fridge',
    description: 'Is there a fridge in room? (true/false)',
    required: false,
  })
  @ApiQuery({
    name: 'price',
    description: 'asc/desc',
    required: false,
  })
  @Get('/rooms/:page')
  getRooms(@Param() params: any, @Query() query: any) {
    return this.addressesService.getRooms(query, params.page);
  }

  @ApiOperation({
    summary: 'Delete address by address ID',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete('/:id')
  deleteAddress(@Param() params: any) {
    return this.addressesService.deleteAddress(params.id);
  }

  @ApiTags('Hotel')
  @ApiOperation({
    summary: 'Get hotels',
  })
  @ApiQuery({
    name: 'country',
    description: 'Country',
    required: false,
  })
  @ApiQuery({
    name: 'city',
    description: 'City',
    required: false,
  })
  @ApiParam({
    name: 'page',
    description: 'Current page',
  })
  @Get('/hotels/:page')
  getHotels(@Param() params: any, @Query() query: any) {
    return this.addressesService.getHotels(query, params.page);
  }

  @ApiOperation({
    summary: 'Update address',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/update')
  updateAddress(@Body() dto: UpdateAddressDto) {
    return this.addressesService.updateAddress(dto);
  }
}
