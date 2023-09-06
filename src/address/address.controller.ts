import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Address } from './address.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {AddressDto, AddressParamsDto, CreateAddressDto} from "./dto/addresses.dto";

@ApiTags('Address')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({
  description: 'Пользователь не авторизован'
})
@Controller('address')
export class AddressController {
  constructor(private addressesService: AddressService) {}

  @ApiOperation({
    summary: 'Create address',
  })
  @ApiCreatedResponse({
    description: 'Address object',
    type: AddressDto
  })
  @Post()
  create(@Body() dto: CreateAddressDto) {
    return this.addressesService.createAddress(dto);
  }

  @ApiOperation({
    summary: 'Delete address by address ID',
  })
  @ApiOkResponse({
    description:  'Successfully deleted'
  })
  @ApiBadRequestResponse({
    description: 'Address not found'
  })
  @Delete('/:id')
  deleteAddress(@Param() params: AddressParamsDto) {
    return this.addressesService.deleteAddress(params.id);
  }

  @ApiOperation({
    summary: 'Update address',
  })
  @ApiOkResponse({
    description: 'Successfully updated'
  })
  @ApiBadRequestResponse({
    description: 'Address with such ID not found'
  })
  @Post('/update')
  updateAddress(@Body() dto: AddressDto) {
    return this.addressesService.updateAddress(dto);
  }
}
