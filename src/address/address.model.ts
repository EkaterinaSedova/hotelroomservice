import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Hotel } from '../hotels/hotel.model';
import { Room } from '../rooms/room.model';

interface AddressCreationAttrs {
  country: string;
  city: string;
  address: string;
}

@Table({ tableName: 'addresses', createdAt: false, updatedAt: false })
export class Address extends Model<Address, AddressCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  country: string;

  @Column({ type: DataType.STRING, allowNull: false })
  city: string;

  @Column({ type: DataType.STRING, allowNull: false })
  address: string;

  @HasOne(() => Hotel)
  hotel: Hotel;

  @HasMany(() => Room)
  rooms: Room;
}
