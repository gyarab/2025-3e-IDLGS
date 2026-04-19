import { pgTable, serial, integer, text, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { resource } from './userSchema';

export const exercise = pgTable(
	'exercise',
	{
		id: serial('id').primaryKey().notNull().unique(),
		/*
	- CRS crossword
	- CRW crossword without result
	- DEF matching definitions
	- GRP graphs of functions, items
	- GEO geometry problems
	- PRG client-side programming problems (future)
	- EXT external embed
	*/
		type: text('type').notNull(),
		name: text('name').notNull(),
		description: text('description').notNull(),
		attempts: integer('attempts').notNull().default(0),
		success: integer('success').notNull().default(0),
		thumbnail: integer('thumbnail').references(() => resource.id),

		crosswordDataId: integer('crosswordDataId').references(
			() => exerciseCrossword.id,
		),
		crs: integer('crs').references(() => exerciseCRS.id),
		crw: integer('crw').references(() => exerciseCRW.id),
		def: integer('def').references(() => exerciseDefinitions.id),
		grp: integer('grp').references(() => exerciseGraph.id),
		geo: integer('geo').references(() => exerciseGeometry.id),
		ext: integer('ext').references(() => exerciseEmbed.id),
	},
	(table) => [
		check(
			'type',
			sql`${table.type} IN ('CRS', 'CRW', 'DEF', 'GRP', 'GEO', 'EXT')`,
		),
	],
);

export const exerciseResource = pgTable('exerciseResource', {
	id: serial('id').primaryKey().notNull().unique(),
	exerciseId: integer('exerciseId')
		.notNull()
		.references(() => exercise.id),
	resourceId: integer('resourceId')
		.notNull()
		.references(() => resource.id),
});

export const exerciseCrossword = pgTable('exerciseCrossword', {
	id: serial('id').primaryKey().notNull().unique(),
	solution: text('solution'),
	words: text('words')
		.array()
		.default(sql`ARRAY[]::text[]`),
	descriptions: text('descriptions')
		.array()
		.default(sql`ARRAY[]::text[]`),
	clue: text('clue')
		.array()
		.default(sql`ARRAY[]::text[]`),
});

export const exerciseCRW = pgTable('exerciseCRW', {
	id: serial('id').primaryKey().notNull().unique(),
	// starting positions and direction of words
	xStarts: integer('xStarts')
		.array()
		.default(sql`ARRAY[]::integer[]`)
		.notNull(),
	yStarts: integer('yStarts')
		.array()
		.default(sql`ARRAY[]::integer[]`)
		.notNull(),
	directions: text('directions')
		.array()
		.default(sql`ARRAY[]::text[]`)
		.notNull(),
	// ids of letters in solution word
	xIds: integer('xIds')
		.array()
		.default(sql`ARRAY[]::integer[]`)
		.notNull(),
	yIds: integer('yIds')
		.array()
		.default(sql`ARRAY[]::integer[]`)
		.notNull(),
});

export const exerciseCRS = pgTable('exerciseCRS', {
	id: serial('id').primaryKey().notNull().unique(),
	offsets: integer('offsets')
		.array()
		.default(sql`ARRAY[]::integer[]`)
		.notNull(),
	columnId: integer('columnId').notNull().default(0),
});

export const exerciseDefinitions = pgTable('exerciseDefinitions', {
	id: serial('id').primaryKey().notNull().unique(),
});

export const exerciseGraph = pgTable('exerciseGraph', {
	id: serial('id').primaryKey().notNull().unique(),
});

export const exerciseGeometry = pgTable('exerciseGeometry', {
	id: serial('id').primaryKey().notNull().unique(),
});

export const exerciseEmbed = pgTable('exerciseEmbed', {
	id: serial('id').primaryKey().notNull().unique(),
	link: text('link').notNull(),
});
