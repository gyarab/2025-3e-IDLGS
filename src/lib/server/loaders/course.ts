import type { CourseType, UserType } from '$lib/types';
import { schema } from '$lib/server/db/mainSchema';
import { eq } from 'drizzle-orm';
import { getRequestEvent } from '$app/server';

export const loadCourses = async (user: UserType): Promise<CourseType[]> => {
	const db = getRequestEvent().locals.db;

	return db
		.select({
			uuid: schema.course.uuid,
			description: schema.course.description,
			createdAt: schema.course.createdAt,
			modifiedAt: schema.course.modifiedAt,
			red: schema.course.red,
			green: schema.course.green,
			blue: schema.course.blue,
			name: schema.course.name,
			subject: schema.course.subject,
		})
		.from(schema.course)
		.innerJoin(
			schema.userCourseLinker,
			eq(schema.course.id, schema.userCourseLinker.course), //join condition
		)
		.where(eq(schema.userCourseLinker.user, user.id));
};
