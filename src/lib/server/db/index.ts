import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { schema } from '$lib/server/db/schema';

export type DBType = PostgresJsDatabase<typeof schema>;
