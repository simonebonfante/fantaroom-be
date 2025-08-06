import axios from 'axios';
import * as cheerio from 'cheerio';
import sequelize from '../models/database';
import Player from '../models/Player';

/**
 * Recupera l'URL dell'immagine di ogni giocatore dal sito fantacalcio.it
 * e aggiorna il campo imageUrl nella tabella players.
 *
 * L'URL di ogni giocatore segue lo schema:
 *   https://www.fantacalcio.it/serie-a/squadre/<team-slug>/aa/<eid>
 * dove:
 *   - <team-slug> è il nome della squadra in minuscolo (es. "milan")
 *   - <eid> è il campo "eid" presente nel CSV e nel DB
 */
async function fetchPlayerImages() {
  await sequelize.sync();

  const players = await Player.findAll();

  for (const player of players) {
    // Se abbiamo già l'immagine, saltiamo per evitare chiamate inutili
    if (player.imageUrl) {
      console.log(`✔️  ${player.name} – image già presente, skip`);
      continue;
    }

    const url = `https://www.fantacalcio.it/serie-a/squadre/milan/aa/${player.eid}`;

    try {
      const res = await axios.get(url, {
        headers: {
          // User-Agent finto per evitare blocchi lato server
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        },
      });

      const $ = cheerio.load(res.data);
      const src = $('img.player-image').attr('src');

      if (!src) {
        console.warn(`⚠️  Immagine non trovata per ${player.name} (${url})`);
        continue;
      }

      await player.update({ imageUrl: src });
      console.log(`✅  ${player.name} aggiornato con ${src}`);
    } catch (error) {
      console.error(`❌  Errore per ${player.name} (${url}):`, (error as Error).message);
    }
  }
}

fetchPlayerImages()
  .then(() => {
    console.log('➡️  Aggiornamento immagini completato');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Errore generale:', err);
    process.exit(1);
  });
