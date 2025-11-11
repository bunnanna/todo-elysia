import Database from 'bun:sqlite';
import Elysia from 'elysia';

const dbPlugin = new Elysia({
  name: 'db',
}).decorate(() => {
  const DB = new Database('', { strict: true });

  DB.run(`
CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    createdDatetime INTEGER NOT NULL
);
  `);
  console.log('db created');
  return { db: DB };
});

export default dbPlugin;
