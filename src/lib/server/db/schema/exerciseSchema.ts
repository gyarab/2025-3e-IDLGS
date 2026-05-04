import { pgTable, serial, integer, text, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { resource } from './userSchema.ts';

export const exercise = pgTable(
	'exercise',
	{
		id: serial('id').primaryKey().notNull(),
		/*
	- CRS crossword
	- CRW crossword without result
	- DEF matching definitions
	- DFT definitons and terms
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
		dft: integer('dft').references(() => exerciseDefinitionsTerms.id),

		backgroundColorR: integer('backgroundColorR').notNull().default(255),
		backgroundColorG: integer('backgroundColorG').notNull().default(255),
		backgroundColorB: integer('backgroundColorB').notNull().default(255),

		foregroundColorR: integer('foregroundColorR').notNull().default(0),
		foregroundColorG: integer('foregroundColorG').notNull().default(0),
		foregroundColorB: integer('foregroundColorB').notNull().default(0),
	},
	(table) => [
		check(
			'type',
			sql`${table.type} IN ('CRS', 'CRW', 'DEF', 'GRP', 'GEO', 'EXT', 'DFT)`,
		),
		check(
			'exerciseTypeData',
			sql`(type = 'CRS' AND crs IS NOT NULL AND "crosswordDataId" IS NULL AND def IS NULL AND grp IS NULL AND geo IS NULL AND ext IS NULL) OR
			(type = 'CRW' AND crw IS NOT NULL AND "crosswordDataId" IS NULL AND def IS NULL AND grp IS NULL AND geo IS NULL AND ext IS NULL) OR
			(type = 'DEF' AND def IS NOT NULL AND "crosswordDataId" IS NULL AND crs IS NULL AND crw IS NULL AND grp IS NULL AND geo IS NULL AND ext IS NULL) OR
			(type = 'GRP' AND grp IS NOT NULL AND "crosswordDataId" IS NULL AND crs IS NULL AND crw IS NULL AND def IS NULL AND geo IS NULL AND ext IS NULL) OR
			(type = 'GEO' AND geo IS NOT NULL AND "crosswordDataId" IS NULL AND crs IS NULL AND crw IS NULL AND def IS NULL AND grp IS NULL AND ext IS NULL) OR
			(type = 'EXT' AND ext IS NOT NULL AND "crosswordDataId" IS NULL AND crs IS NULL AND crw IS NULL AND def IS NULL AND grp IS NULL AND geo IS NULL) OR
			(type = 'DFT' AND dft IS NOT NULL AND "crosswordDataId" IS NULL AND crs IS NULL AND crw IS NULL AND def IS NULL AND grp IS NULL AND geo IS NULL AND ext IS NULL) OR
			(type = 'CRW' AND "crosswordDataId" IS NOT NULL AND crs IS NULL AND def IS NULL AND grp IS NULL AND geo IS NULL AND ext IS NULL)
			`,
		),
		check(
			'colorValues',
			sql`("backgroundColorR" >= 0 AND "backgroundColorR" <= 255) AND
			("backgroundColorG" >= 0 AND "backgroundColorG" <= 255) AND
			("backgroundColorB" >= 0 AND "backgroundColorB" <= 255) AND
			("foregroundColorR" >= 0 AND "foregroundColorR" <= 255) AND
			("foregroundColorG" >= 0 AND "foregroundColorG" <= 255) AND
			("foregroundColorB" >= 0 AND "foregroundColorB" <= 255)`,
		),
	],
);

export const exerciseResource = pgTable('exerciseResource', {
	id: serial('id').primaryKey().notNull(),
	exerciseId: integer('exerciseId')
		.notNull()
		.references(() => exercise.id),
	resourceId: integer('resourceId')
		.notNull()
		.references(() => resource.id),
});

export const exerciseCrossword = pgTable('exerciseCrossword', {
	id: serial('id').primaryKey().notNull(),
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
	id: serial('id').primaryKey().notNull(),
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
	id: serial('id').primaryKey().notNull(),
	offsets: integer('offsets')
		.array()
		.default(sql`ARRAY[]::integer[]`)
		.notNull(),
	columnId: integer('columnId').notNull().default(0),
});

export const exerciseDefinitions = pgTable('exerciseDefinitions', {
	id: serial('id').primaryKey().notNull(),
});

export const exerciseGraph = pgTable('exerciseGraph', {
	id: serial('id').primaryKey().notNull(),
	task: text('task').notNull(),
});

export const exerciseGraphFunction = pgTable('exerciseGraphFunction', {
	id: serial('id').primaryKey().notNull(),
	latex: text('latex').notNull(),
});

export const exerciseGeometry = pgTable('exerciseGeometry', {
	id: serial('id').primaryKey().notNull(),
	task: text('task').notNull(),
});

export const exerciseGeometryStepsLinker = pgTable('exerciseGeometryStepsLinker', {
	id: serial('id').primaryKey().notNull(),
	geometryId: integer('geometryId')
		.notNull()
		.references(() => exerciseGeometry.id, { onDelete: 'cascade' }),
	stepsId: integer('stepsId')
		.notNull()
		.references(() => exerciseGeometryConstructionSteps.id, { onDelete: 'cascade' }),
});

export const exerciseGeometryConstructionSteps = pgTable('exerciseGeometryConstructionSteps', {
	id: serial('id').primaryKey().notNull(),
	text: text('text').notNull(),
});

export const exerciseEmbed = pgTable('exerciseEmbed', {
	id: serial('id').primaryKey().notNull(),
	link: text('link').notNull(),
});

export const exerciseDefinitionsTerms = pgTable('exerciseDefinitionsTerms', {
	id: serial('id').primaryKey().notNull(),
	definitions: text('definitions')
		.array()
		.default(sql`ARRAY[]::text[]`)
		.notNull(),
	terms: text('terms')
		.array()
		.default(sql`ARRAY[]::text[]`)
		.notNull(),
});