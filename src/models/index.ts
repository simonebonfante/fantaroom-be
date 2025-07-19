import sequelize from './database';

// Inizializzazione modelli (l'import esegue la chiamata Model.init)
import Player from './Player';
import User from './User';
import Session from './Session';
import Bid from './Bid';

// Definizione associazioni
// User ↔ Session (vincitore)
Session.belongsTo(User, { foreignKey: 'winnerId', as: 'winner' });
User.hasMany(Session, { foreignKey: 'winnerId', as: 'winningSessions' });

// Player ↔ Session (giocatore in asta)
Session.belongsTo(Player, { foreignKey: 'playerId', as: 'player' });
Player.hasOne(Session, { foreignKey: 'playerId', as: 'session' });

// Bid ↔ Session / User
Bid.belongsTo(Session, { foreignKey: 'sessionId', as: 'session' });
Bid.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Session.hasMany(Bid, { foreignKey: 'sessionId', as: 'bids' });
User.hasMany(Bid, { foreignKey: 'userId', as: 'bids' });


// Esportiamo i modelli per uso comodo
export { sequelize, Player, User, Session, Bid };
export default sequelize;
