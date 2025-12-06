import * as dataSchema from '$lib/server/db/schema';
import { eq, count, and } from 'drizzle-orm';
import { db } from '$lib/server/db';

export const getSetting = async (key: string, lang: string = 'all'): Promise<string> => {
	const value = await db
		.select()
		.from(dataSchema.setting)
		.where(and(eq(dataSchema.setting.key, key), eq(dataSchema.setting.lang, lang)))
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
			.where(and(eq(dataSchema.setting.key, key), eq(dataSchema.setting.lang, lang)))
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
			.where(and(eq(dataSchema.setting.key, key), eq(dataSchema.setting.lang, lang)));
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
			.where(and(eq(dataSchema.setting.key, key), eq(dataSchema.setting.lang, lang)))
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