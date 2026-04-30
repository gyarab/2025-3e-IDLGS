import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw Error('DATABASE_URL not set!');

export default defineConfig({
	out: './drizzle',
	schema: './src/lib/server/db/schema',
	dialect: 'postgresql',
	verbose: true,
	strict: true,
	dbCredentials: { url: process.env.DATABASE_URL },
});
