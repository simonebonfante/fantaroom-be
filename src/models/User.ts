import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './database';

interface UserAttributes {
  id: string;
  name: string;
  socketId?: string | null;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Permette id, createdAt, updatedAt opzionali in input (generati automaticamente)
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt' | 'socketId'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public socketId!: string | null;
  public isAdmin!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  socketId: { type: DataTypes.STRING, allowNull: true },
  isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, {
  sequelize,
  tableName: 'users',
});

export default User;
