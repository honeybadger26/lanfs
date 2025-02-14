import { Database } from "bun:sqlite";

const DB_PATH = './tmp/db.sqlite';

export async function getDb() {
  const dbFile = Bun.file(DB_PATH);
  let db: Database;

  if (await dbFile.exists()) {
    db = new Database(DB_PATH);
  } else {
    db = new Database(DB_PATH, { create: true });
    const initDatabase = db.transaction(() => {
      db.query(`
        CREATE TABLE text (
          id INTEGER PRIMARY KEY,
          contents TEXT NOT NULL,
          isLink INTEGER NOT NULL
        );
      `).run();
      db.query(`
        CREATE TABLE files (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          link TEXT NOT NULL
        );
      `).run();
    });

    initDatabase();
  }

  return db;
};
