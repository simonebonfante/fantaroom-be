import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import sequelize from '../models/database';
import Player from '../models/Player';

async function importPlayers() {
  const filePath = path.resolve(__dirname, '../../docs/FantaRoom listone 25_26 - Foglio1.csv');
  const csvContent = fs.readFileSync(filePath, 'utf-8');

  // parse CSV, skipping header
  const records: string[][] = parse(csvContent, {
    delimiter: ',',
    columns: false,
    skip_empty_lines: true,
  });

  const playersData = records.slice(1).map((row) => {
    const role = row[0];
    const name = row[3];
    const team = row[4];
    const value = parseInt(row[5]);
    return { name, role, team, value };
  });

  await sequelize.sync(); // ensure table exists

  // optional: clear existing
  await Player.destroy({ where: {} });

  await Player.bulkCreate(playersData);

  console.log(`Importati ${playersData.length} giocatori`);
}

importPlayers()
  .then(() => {
    console.log('Done');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  }); 