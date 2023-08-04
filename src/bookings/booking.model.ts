import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript"
import {User} from "../users/user.model";
import {Hotel} from "../hotels/hotel.model";
import {Room} from "../rooms/room.model";

interface BookingCreationAttrs {
    inDate: string;
    outDate: string;
}

@Table({tableName: 'boookings', updatedAt: false})
export class Booking extends Model<Booking, BookingCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false, field: "in_date"})
    inDate: number;

    @Column({type: DataType.INTEGER, allowNull: false, field: "out_date"})
    outDate: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, field: "user_id"})
    userId: number;

    @ForeignKey(() => Room)
    @Column({type: DataType.INTEGER, field: "room_id"})
    roomId: number;

    @ForeignKey(() => Hotel)
    @Column({type: DataType.INTEGER, field: "hotel_id"})
    hotelId: number;

}