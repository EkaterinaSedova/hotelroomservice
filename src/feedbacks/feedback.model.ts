import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Hotel } from '../hotels/hotel.model';

interface FeedbackCreationAttrs {
  rate: number;
  message: string;
}

@Table({ tableName: 'feedbacks', updatedAt: false })
export class Feedback extends Model<Feedback, FeedbackCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  rate: number;

  @Column({ type: DataType.STRING })
  message: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, field: 'user_id' })
  userId: number;

  @ForeignKey(() => Hotel)
  @Column({ type: DataType.INTEGER, field: 'hotel_id' })
  hotelId: number;
}
