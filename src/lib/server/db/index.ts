/*
	db/index.ts
	Martin Bykov
*/

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw Error('DATABASE_URL not set!');

const client = postgres(env.DATABASE_URL, { prepare: false });
export const db = drizzle(client, { schema });
