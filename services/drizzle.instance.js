import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';

export const sqlInstance = SQLite.openDatabaseSync('db.db');
export const drizzleInstance = drizzle(sqlInstance);