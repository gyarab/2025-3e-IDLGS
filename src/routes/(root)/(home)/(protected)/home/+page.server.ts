import { loadCourses } from '$lib/server/loaders/course.js';
import { loadTextbooks } from '$lib/server/loaders/textbook.js';
import type { UserType } from '$lib/types.js';
import { MAX_NAME_LENGTH } from '$lib';
import { formRunner } from '$lib/server/form/runner.js';
import { schema } from '$lib/server/db/mainSchema.js';
import { eq, inArray } from 'drizzle-orm';
import { writeLog } from '$lib/log.js';
import { fail } from '@sveltejs/kit';

export const load = async (event) => {
	const user = (await event.parent()).user as UserType;

	//TODO don't load everything, split across multiple page loads
	//load articles only on article page, etc. etc.
	return {
		courses: loadCourses(user),
		textbooks: loadTextbooks(user),
	};
};

export const actions = {
	createTextbook: async (event) => {
		return await formRunner(
			[
				'name',
				'description',
				'subject',
				'red',
				'green',
				'blue',
				'users',
				'roles',
				'articles',
				'chapters',
				'internet',
			],
			async (event, formData, cookies, user) => {
				if (
					formData['name'].length === 0 ||
					formData['description'].length === 0 ||
					formData['name'].length > MAX_NAME_LENGTH
				) {
					return fail(400);
				}

				const articles = JSON.parse(formData['articles']) as string[][];
				const chapters = JSON.parse(formData['chapters']) as string[];
				const users = JSON.parse(formData['users']) as string[];
				const roles = JSON.parse(formData['roles']) as string[];

				if (users.length !== roles.length) {
					return fail(400);
				}
				if (users.indexOf(user.uuid) === -1) {
					users.push(user.uuid);
					roles.push('owner');
				}

				try {
					await event.locals.db.transaction(async (tx) => {
						//summary generated later
						const textbook = (
							await tx
								.insert(schema.textbook)
								.values({
									name: formData['name'],
									description: formData['description'],
									subject: formData['subject'],
									red: parseInt(formData['red']),
									green: parseInt(formData['green']),
									blue: parseInt(formData['blue']),
									public:
										formData['internet'] === 'true'
											? true
											: false,
								})
								.returning({ id: schema.textbook.id })
						)[0].id;

						//chapters and articles
						for (let i = 0; i < chapters.length; i++) {
							const chapterInsert = await tx
								.insert(schema.chapter)
								.values({
									name: chapters[i],
									summary: '',
									textbook: textbook,
								})
								.returning({ id: schema.chapter.id });

							for (const article of articles[i]) {
								await tx.insert(schema.article).values({
									chapter: chapterInsert[0].id,
									name: article,
									text: '',
								});
							}
						}

						const userIds = (
							await tx
								.select({
									id: schema.user.id,
									uuid: schema.user.uuid,
								})
								.from(schema.user)
								.where(inArray(schema.user.uuid, users))
						).map((u) => {
							return {
								user: u.id,
								role: roles[users.indexOf(u.uuid)],
								textbook: textbook,
							};
						});

						await tx
							.insert(schema.userTextbookLinker)
							.values(userIds);
					});
				} catch (e) {
					writeLog(event, 'ERROR', 'DB failure.', user);
					return fail(500);
				}
			},
		);
	},
	createCourse: async (event) => {
		return await formRunner(
			[
				'name',
				'description',
				'subject',
				'red',
				'green',
				'blue',
				'users',
				'roles',
				'grades',
				'code',
			],
			async (event, formData, cookies, user) => {
				if (
					formData['name'].length === 0 ||
					formData['description'].length === 0 ||
					formData['name'].length > MAX_NAME_LENGTH
				) {
					return fail(400);
				}

				//TODO

				try {
					await event.locals.db.transaction(async (tx) => {});
				} catch (e) {
					writeLog(event, 'ERROR', 'DB failure.', user);
					return fail(500);
				}
			},
		);
	},
};
