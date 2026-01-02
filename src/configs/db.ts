import Database from 'bun:sqlite';
import Elysia from 'elysia';

const dbPlugin = new Elysia({
  name: 'db',
}).decorate(() => {
  const db = new Database('', { strict: true });

  Bun.file('./src/configs/init.sql')
    .text()
    .then((sql) => db.run(sql));

  return { db };
});

export default dbPlugin;
