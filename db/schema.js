import * as Crypto from 'expo-crypto';

import { sql } from "drizzle-orm";
import { customType, integer, text, uniqueIndex, primaryKey, foreignKey, sqliteTable, AnySQLiteColumn } from "drizzle-orm/sqlite-core";
import { z } from 'zod';

import { generateUniqueString } from "./utils";

export const users = sqliteTable(
    "users",
    {
        uid: integer().primaryKey({autoIncrement : true}),
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

export const posts = sqliteTable(
    "posts",
    {
        id: integer().primaryKey({autoIncrement : true}),
        title: text().notNull(),
        content: text().notNull(),
        ownerId: text().notNull(),
        createdAt: integer({ mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
    }, (table) => {
        return {
            userReference: foreignKey({
                columns: [table.ownerId],
                foreignColumns: [users.uid],
                name: "ownerId_fkey",
            }),
        }
    }
);

export const comments = sqliteTable(
    "comments", 
    {
        id: integer().primaryKey({autoIncrement : true}),
        content: text().notNull(),
        ownerId: text().notNull(),
        postId: text().notNull(),
        createdAt: integer({ mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
    }, (table) => {
        return {
            userReference: foreignKey({
                columns: [table.ownerId],
                foreignColumns: [users.uid],
                name: "ownerId_fkey",
            }),
            postReference: foreignKey({
                columns: [table.postId],
                foreignColumns: [posts.id],
                name: "postId_fkey",
            }),
        }
    }
);

export const likes = sqliteTable(
    "likes", 
    {
        id: integer().primaryKey({autoIncrement : true}),
        ownerId: text().notNull(),
        postId: text().notNull(),
        createdAt: integer({ mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
    }, (table) => {
        return {
            userReference: foreignKey({
                columns: [table.ownerId],
                foreignColumns: [users.uid],
                name: "ownerId_fkey",
            }),
            postReference: foreignKey({
                columns: [table.postId],
                foreignColumns: [posts.id],
                name: "postId_fkey",
            }),
        }
    }
);