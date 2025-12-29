import type { CourseType, UserType } from '$lib/types';
import { schema } from '$lib/server/db/mainSchema';
import type { DBType } from '../db/types';
import { eq } from 'drizzle-orm';

export const loadCourses = async (
	db: DBType, user: UserType
): Promise<CourseType[]> => {
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
				subject: schema.course.subject
		})
		.from(schema.course)
		.innerJoin(
			schema.userCourseLinker,
			eq(schema.course.id, schema.userCourseLinker.course) //join condition
		)
		.where(eq(schema.userCourseLinker.user, user.id));
};
