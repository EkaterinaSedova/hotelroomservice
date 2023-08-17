import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Hotel } from '../hotels/hotel.model';
import { Booking } from '../bookings/booking.model';
import { Address } from '../address/address.model';

interface RoomCreationAttrs {
  id: number;
  options: string;
  readonly images: string[];
  readonly hotelId: number;
  readonly addressId: number;
}

@Table({ tableName: 'rooms', createdAt: false, updatedAt: false })
export class Room extends Model<Room, RoomCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.JSONB })
  options;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  images: string[];

  @ForeignKey(() => Hotel)
  @Column({ type: DataType.INTEGER, field: 'hotel_id' })
  hotelId: number;

  @ForeignKey(() => Address)
  @Column({ type: DataType.INTEGER, field: 'address_id' })
  addressId: number;

  @HasMany(() => Booking)
  bookings: Booking[];
}
