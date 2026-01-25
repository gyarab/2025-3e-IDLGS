import type { UserType, MessageType } from '$lib/types';
import { getRequestEvent } from '$app/server';
import { schema } from '$lib/server/db/mainSchema';
import { gt, and, eq } from 'drizzle-orm';
import { renderMarkdown } from '$lib/markdown';

export const loadMessages = async (user: UserType): Promise<MessageType[]> => {
	const db = getRequestEvent().locals.db;

	return (
		await db
			.select({
				lang: schema.message.lang,
				content: schema.message.content,
				name: schema.message.name,
			})
			.from(schema.message)
			.where(
				and(
					gt(schema.message.id, user.lastMessage),
					eq(schema.message.lang, user.lang),
				),
			)
	).map((msg) => {
		return {
			...msg,
			content: renderMarkdown(msg.content),
		};
	});
};
