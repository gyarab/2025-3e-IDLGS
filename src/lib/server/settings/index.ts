import * as dataSchema from '$lib/server/db/schema';
import { eq, count } from 'drizzle-orm';
import { db } from '$lib/server/db';

export const getSetting = async (key: string, lang: string = 'all'): Promise<string> => {
	const value = await db
		.select()
		.from(dataSchema.setting)
		.where(eq(dataSchema.setting.key, key))
		.limit(1);

	return value.length === 0 ? '' : value[0].value;
};

export const setSetting = async (
	key: string,
	value: string,
	lang: string = 'all'
): Promise<void> => {
	//get count first

	const len = (
		await db
			.select({ count: count() })
			.from(dataSchema.setting)
			.where(eq(dataSchema.setting.key, key))
			.limit(1)
	)[0].count;

	if (len === 0) {
		//create new
		await db.insert(dataSchema.setting).values({
			key: key,
			value: value,
		});
	} else {
		//update existing
		await db
			.update(dataSchema.setting)
			.set({
				value: value
			})
			.where(eq(dataSchema.setting.key, key));
	}
};

export const checkSetting = async (
	key: string,
	value: string,
	lang: string = 'all'
): Promise<void> => {
	//get count first

	const len = (
		await db
			.select({ count: count() })
			.from(dataSchema.setting)
			.where(eq(dataSchema.setting.key, key))
			.limit(1)
	)[0].count;

	if (len === 0) {
		//create new if no existing
		await db.insert(dataSchema.setting).values({
			key: key,
			value: value,
		});
	}
};