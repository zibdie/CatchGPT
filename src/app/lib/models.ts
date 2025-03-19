import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

export interface TrackingInfo {
  id: string;
  userAgent: string;
  ipAddress: string;
  timestamp: Date;
  fakeName: string;
}

interface TrackingRow {
  id: string;
  userAgent: string;
  ipAddress: string;
  timestamp: string;
  fakeName: string;
}

// Ensure the data directory exists
const DATA_DIR = process.env.SQLITE_DATA_DIR || path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'catchgpt.db');

/* SQLite database implementation with connection management and concurrency handling */
export class TrackingDB {
  /* Open a new database connection and initialize if needed */
  private static getConnection(): Database.Database {
    /* Create a new database connection with a busy timeout */
    const db = new Database(DB_PATH, {
      /* Set a 5 second timeout for busy/locked database */
      timeout: 5000,
      /* Use verbose mode only in development for debugging */
      verbose: process.env.NODE_ENV === 'development' ? console.log : undefined
    });
    
    /* Configure SQLite for better performance with WAL mode */
    db.pragma('journal_mode = WAL'); /* Use WAL mode for better concurrency and performance */
    db.pragma('synchronous = NORMAL'); /* Balance between safety and performance */
    db.pragma('busy_timeout = 5000'); /* Wait 5 seconds if the database is busy */
    
    /* Create the tracking table if it doesn't exist */
    db.exec(`
      CREATE TABLE IF NOT EXISTS tracking (
        id TEXT PRIMARY KEY,
        userAgent TEXT,
        ipAddress TEXT,
        timestamp TEXT,
        fakeName TEXT
      )
    `);
    
    return db;
  }
  
  static addTracking(tracking: TrackingInfo): void {
    const db = this.getConnection();
    
    try {
      db.exec('BEGIN TRANSACTION');
      
      const stmt = db.prepare(`
        INSERT INTO tracking (id, userAgent, ipAddress, timestamp, fakeName)
        VALUES (?, ?, ?, ?, ?)
      `);
      
      stmt.run(
        tracking.id,
        tracking.userAgent,
        tracking.ipAddress,
        tracking.timestamp.toISOString(),
        tracking.fakeName
      );
      
      db.exec('COMMIT');
    } catch (error) {
      try {
        db.exec('ROLLBACK');
      } catch (rollbackError) {
        console.error('Error rolling back transaction:', rollbackError);
      }
      throw error;
    } finally {
      db.close();
    }
  }
  
  static getTracking(id: string): TrackingInfo | undefined {
    const db = this.getConnection();
    
    try {
      const stmt = db.prepare('SELECT * FROM tracking WHERE id = ?');
      const row = stmt.get(id) as TrackingRow | undefined;
      
      if (!row) return undefined;
      
      return {
        id: row.id,
        userAgent: row.userAgent,
        ipAddress: row.ipAddress,
        timestamp: new Date(row.timestamp),
        fakeName: row.fakeName
      };
    } finally {
      db.close();
    }
  }
  
  static getAllTrackings(): TrackingInfo[] {
    const db = this.getConnection();
    
    try {
      const stmt = db.prepare('SELECT * FROM tracking ORDER BY timestamp DESC');
      const rows = stmt.all() as TrackingRow[];
      
      return rows.map(row => ({
        id: row.id,
        userAgent: row.userAgent,
        ipAddress: row.ipAddress,
        timestamp: new Date(row.timestamp),
        fakeName: row.fakeName
      }));
    } finally {
      db.close();
    }
  }
} 