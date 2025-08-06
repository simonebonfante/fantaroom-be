import sequelize from './index';

async function syncModels() {
  await sequelize.sync({ alter: true, force: false });
  console.log('Database synchronized');
}

export default syncModels;
