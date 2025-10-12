/**
 * Database Configuration - Native Platform
 * Para Android/iOS com SQLite
 */

import * as SQLite from 'expo-sqlite';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

class Database {
  private static instance: Database;
  private db: SQLite.SQLiteDatabase | null = null;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async initialize(): Promise<void> {
    this.db = await SQLite.openDatabaseAsync('cinema.db');
    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Database initialized successfully');
  }

  public getDatabase(): SQLite.SQLiteDatabase | null {
    return this.db;
  }

  public async close(): Promise<void> {
    if (this.db) {
      await this.db.closeAsync();
      this.db = null;
    }
  }
}

export default Database;

