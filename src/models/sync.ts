import sequelize from './index';

async function syncModels() {
  await sequelize.sync({ alter: true, force: true }); // { force: true } cancella e ricrea le tabelle
  console.log('Database synchronized');
}

export default syncModels;
