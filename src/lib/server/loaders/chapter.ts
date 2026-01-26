import { getRequestEvent } from "$app/server"
import { schema } from "../db/mainSchema";
import { eq } from "drizzle-orm";

export const loadChapter = async (uuid: string) => {
	const db = getRequestEvent().locals.db;	

	const result = await db
		.select({
			uuid: schema.chapter.uuid,
			name: schema.chapter.name,
			order: schema.chapter.order,
		})
		.from(schema.chapter)
		.where(eq(
			schema.chapter.uuid,
			uuid,
		))
		.limit(1);

	if(result.length === 0) {
		return undefined;
	}

	return result[0];
}