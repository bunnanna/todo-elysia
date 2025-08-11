import Database from 'bun:sqlite';

const db = new Database('', { strict: true });

db.run(`
CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    createdDatetime INTEGER NOT NULL
);
  `);

export default db;
