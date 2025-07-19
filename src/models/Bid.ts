import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './database';

interface BidAttributes {
  id: string;
  sessionId: string;
  userId: string;
  price: number;
  isLastBid: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BidCreationAttributes extends Optional<BidAttributes, 'id' | 'createdAt' | 'updatedAt' | 'isLastBid'> {}

class Bid extends Model<BidAttributes, BidCreationAttributes> implements BidAttributes {
  public id!: string;
  public sessionId!: string;
  public userId!: string;
  public price!: number;
  public isLastBid!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Bid.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  sessionId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isLastBid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize,
  tableName: 'bids',
});

// Associations

export default Bid; 