import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as dataSchema from '$lib/server/db/schema';

export type DBType = PostgresJsDatabase<typeof dataSchema>;