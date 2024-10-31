import { sql } from "drizzle-orm";
import { sqliteTable as table, integer, text, primaryKey, foreignKey, uniqueIndex } from "drizzle-orm/sqlite-core";

const users = table(
    "users",
    {
        uid: integer().primaryKey({ autoIncrement: true }),
        firstName: text().notNull(),
        lastName: text().notNull(),
        email: text().notNull(),
        password: text().notNull(),
        createdAt: integer({ mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
    }, (table) => {
        return {
            emailIndex: uniqueIndex("email_inx").on(table.email),
        }
    }
);

export default users;