import { Transaction } from 'sequelize';
import sequelize from '../../models/database';
import { Bid, Session, User } from '../../models';

export async function placeBidTx(
  userId: string,
  price: number
) {
  return sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (t) => {
        const user = await User.findByPk(userId, { transaction: t });
        if (!user) {
          throw new Error('Utente non trovato')
        }
        const activeSession = await Session.findOne({ where: { isActive: true }, transaction: t, lock: t.LOCK.UPDATE });
        if (!activeSession) {
            throw new Error('Nessuna sessione attiva trovata')
        }

        if (activeSession.price === 0) {
            console.log('Prima offerta');
            const newBid = await createBid(activeSession.id, user.id, price, true, t);
            activeSession.price = price;
            await activeSession.save({transaction: t});
            return newBid;
        }

        const lastBid = await Bid.findOne({ where: { sessionId: activeSession.id, isLastBid: true }, transaction: t, lock: t.LOCK.UPDATE });
        if (!lastBid) {
          throw new Error('Nessun bid trovato')
        }

        if (price <= activeSession.price) {
            throw new Error('Il prezzo del bid è inferiore al prezzo della sessione')
        }
      
        const newBid = await createBid(activeSession.id, user.id, price, true, t);
        activeSession.price = price;
        lastBid.isLastBid = false;
        await lastBid.save({transaction: t});
        await activeSession.save({transaction: t});
        return newBid;
    }
  );
}

async function createBid(sessionId: string, userId: string, price: number, isLastBid: boolean, transaction: Transaction) {
    const newBid = await Bid.create({ sessionId, userId, price, isLastBid }, { transaction });
    return newBid;
}