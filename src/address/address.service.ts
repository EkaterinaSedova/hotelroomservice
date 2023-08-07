import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Address} from "./address.model";
import {CreateAddressDto} from "./dto/create-address.dto";

@Injectable()
export class AddressService {
    constructor(@InjectModel(Address) private addressRepository: typeof Address) {
    }

    async createAddress(dto: CreateAddressDto) {
        const address = await this.addressRepository.create(dto);
        return address;
    }
}
