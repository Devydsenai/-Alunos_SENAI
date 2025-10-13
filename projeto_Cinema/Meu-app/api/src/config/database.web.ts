/**
 * Database Configuration - Web Platform
 * In-memory storage (sem SQLite)
 */

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

class Database {
  private static instance: Database;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async initialize(): Promise<void> {
    console.log('⚠️  Database not available on web (using in-memory storage)');
  }

  public getDatabase(): null {
    return null;
  }

  public async close(): Promise<void> {}
}

export default Database;


