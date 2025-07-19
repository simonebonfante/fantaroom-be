import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://fantaroom_user:fantaroom_pass@localhost:5432/fantaroom',
  {
    dialect: 'postgres',
    logging: true,
  }
);

export default sequelize; 