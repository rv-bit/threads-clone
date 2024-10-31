import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../drizzle/migrations/migrations';

export const applyMigrations = (db) => {
    const { success, error } = useMigrations(db, migrations);
    return { success, error };
};