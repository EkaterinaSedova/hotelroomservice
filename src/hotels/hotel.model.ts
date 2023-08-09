import {Column, DataType, ForeignKey, HasMany, HasOne, Model, Table} from "sequelize-typescript"
import {Address} from "../address/address.model";
import {Feedback} from "../feedbacks/feedback.model";
import {Room} from "../rooms/room.model";

interface HotelCreationAttrs {
    name: string;
    description: string;
    address: string;
    starRating: number;
    contacts: string;
    images: string[];
}

@Table({tableName: 'hotels', createdAt: false, updatedAt: false })
export class Hotel extends Model<Hotel, HotelCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.TEXT})
    description: string;

    @Column({type: DataType.ARRAY(DataType.STRING), allowNull: true})
    images: string[];

    @Column({type: DataType.INTEGER, allowNull: false, field: 'star_rating'})
    starRating: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    contacts: string;

    @ForeignKey(() => Address)
    @Column({type: DataType.INTEGER, field: 'address_id'})
    addressId: number;

    @HasMany(() => Feedback)
    feedbacks: Feedback[];

    @HasMany(() => Room)
    rooms: Room[];
}