import { getManager } from 'typeorm';

const cleanJwts = async () => {
  await getManager().query(`
    DELETE FROM jwt
    WHERE createTimestamp <= NOW() - INTERVAL 31 DAY
  `);
};

export default cleanJwts;
