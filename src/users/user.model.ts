import {Column, DataType, Model, Table, HasMany} from "sequelize-typescript"
import {Feedback} from "../feedbacks/feedback.model";

interface UserCreationAttrs {
    login: string;
    password: string;
    name: string;
    isAdmin: string;
}

@Table({tableName: 'users', updatedAt: false, createdAt: false})
export class User extends Model<User, UserCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @HasMany(() => Feedback)
    feedbacks: Feedback[];
}