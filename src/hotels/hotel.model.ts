import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript"
import {Feedback} from "../feedbacks/feedback.model";
import {Room} from "../rooms/room.model";

interface HotelCreationAttrs {
    name: string;
    description: string;
    address: string;
    starRating: number;
    contacts: string;
}

@Table({tableName: 'hotels', createdAt: false, updatedAt: false })
export class Hotel extends Model<Hotel, HotelCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.TEXT})
    description: string;

    @Column({type: DataType.STRING, allowNull: false})
    address: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    starRating: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    contacts: string;

    @HasMany(() => Feedback)
    feedbacks: Feedback[];

    @HasMany(() => Room)
    rooms: Room[];
}