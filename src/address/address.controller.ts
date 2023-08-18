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

  @ApiOperation({
    summary: 'Delete address by address ID',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete('/:id')
  deleteAddress(@Param() params: any) {
    return this.addressesService.deleteAddress(params.id);
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
