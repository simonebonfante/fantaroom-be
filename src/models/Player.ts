import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './database';

interface PlayerAttributes {
  id: string;
  name: string;
  role: string;      // es: "P", "D", "C", "A"
  team: string;
  value: number;
  imageUrl?: string | null;
  taken: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PlayerCreationAttributes extends Optional<PlayerAttributes, 'id' | 'createdAt' | 'updatedAt' | 'imageUrl' | 'taken' | 'value'> {}

class Player extends Model<PlayerAttributes, PlayerCreationAttributes> implements PlayerAttributes {
  public id!: string;
  public name!: string;
  public role!: string;
  public team!: string;
  public value!: number;
  public imageUrl!: string | null;
  public taken!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Player.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  team: { type: DataTypes.STRING, allowNull: false },
  value: { type: DataTypes.INTEGER, allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: true },
  taken: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, {
  sequelize,
  tableName: 'players',
});

export default Player;
