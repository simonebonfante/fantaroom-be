import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './database';

interface SessionAttributes {
  id: string;
  isActive: boolean;
  playerId: string;
  price: number;
  winnerId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Permette id, createdAt, updatedAt opzionali in input (generati automaticamente)
interface SessionCreationAttributes extends Optional<SessionAttributes, 'id' | 'createdAt' | 'updatedAt' | 'winnerId'> {}

class Session extends Model<SessionAttributes, SessionCreationAttributes> implements SessionAttributes {
  public id!: string;
  public isActive!: boolean;
  public playerId!: string;
  public price!: number;
  public winnerId?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Session.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  playerId: { type: DataTypes.UUID, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  winnerId: { 
    type: DataTypes.UUID, 
    allowNull: true
  },
}, {
  sequelize,
  tableName: 'sessions',
});

// Associazione: una session ha un vincitore (utente)

export default Session;
