import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

const sqlInstance = SQLite.openDatabaseSync("db");
const database = drizzle(sqlInstance);

export { database, sqlInstance };