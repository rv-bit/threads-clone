import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';

const sqlInstance = SQLite.openDatabaseSync('db.db');
const drizzleInstance = drizzle(sqlInstance);

export {
    sqlInstance,
    drizzleInstance,
}