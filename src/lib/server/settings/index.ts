import { schema } from '$lib/server/db/mainSchema';
import { eq, count } from 'drizzle-orm';
import { getRequestEvent } from '$app/server';

export const getSetting = async (key: string): Promise<string> => {
	const db = getRequestEvent().locals.db;

	const value = await db
		.select()
		.from(schema.setting)
		.where(eq(schema.setting.key, key))
		.limit(1);

	return value.length === 0 ? '' : value[0].value;
};

export const setSetting = async (key: string, value: string): Promise<void> => {
	const db = getRequestEvent().locals.db;

	//get count first

	const len = (
		await db
			.select({ count: count() })
			.from(schema.setting)
			.where(eq(schema.setting.key, key))
			.limit(1)
	)[0].count;

	if (len === 0) {
		//create new
		await db.insert(schema.setting).values({
			key: key,
			value: value,
		});
	} else {
		//update existing
		await db
			.update(schema.setting)
			.set({
				value: value,
			})
			.where(eq(schema.setting.key, key));
	}
};

export const checkSetting = async (
	key: string,
	value: string,
): Promise<void> => {
	const db = getRequestEvent().locals.db;

	//get count first

	const len = (
		await db
			.select({ count: count() })
			.from(schema.setting)
			.where(eq(schema.setting.key, key))
			.limit(1)
	)[0].count;

	if (len === 0) {
		//create new if no existing
		await db.insert(schema.setting).values({
			key: key,
			value: value,
		});
	}
};
