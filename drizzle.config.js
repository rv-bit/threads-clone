import type { Config } from 'drizzle-kit';

export default {
    dialect: 'sqlite',
    driver: 'expo',
    schema: './db/schema.js',
    out: './drizzle',
} satisfies Config;