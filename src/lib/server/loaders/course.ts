import type {
	CourseAssignmentType,
	CourseMessageType,
	CourseType,
	UserType,
} from '$lib/types';
import { schema } from '$lib/server/db/mainSchema';
import { and, eq } from 'drizzle-orm';
import { getRequestEvent } from '$app/server';
import { renderMarkdown } from '$lib/markdown';

export const loadCourses = async (user: UserType): Promise<CourseType[]> => {
	const db = getRequestEvent().locals.db;

	const courses = await db
		.select({
			id: schema.course.id,
			uuid: schema.course.uuid,
			description: schema.course.description,
			createdAt: schema.course.createdAt,
			modifiedAt: schema.course.modifiedAt,
			red: schema.course.red,
			green: schema.course.green,
			blue: schema.course.blue,
			name: schema.course.name,
			subject: schema.course.subject,
			archived: schema.course.archived,
		})
		.from(schema.course)
		.innerJoin(
			schema.userCourseLinker,
			eq(schema.course.id, schema.userCourseLinker.course), //join condition
		)
		.where(eq(schema.userCourseLinker.user, user.id));

	for (let i = 0; i < courses.length; i++) {
		const authorsData = await db
			.select({
				uuid: schema.user.uuid,
				email: schema.user.email,
				name: schema.user.name,
				surname: schema.user.surname,
				degree: schema.user.degree,
				isOwner: schema.userCourseLinker.owner,
				isTeacher: schema.userCourseLinker.teacher,
			})
			.from(schema.user)
			.innerJoin(
				schema.userCourseLinker,
				eq(schema.user.id, schema.userCourseLinker.user),
			)
			.where(eq(schema.userCourseLinker.course, courses[i].id));
		(courses[i] as CourseType).people = authorsData;

		courses[i].description = renderMarkdown(courses[i].description);
	}

	return courses.map((c) => {
		return {
			...c,
			id: undefined,
		};
	});
};

export const loadSingleCourse = async (
	user: UserType | undefined,
	courseUuid: string,
	people: boolean = false,
	assignments: boolean = false,
	messages: boolean = false,
): Promise<CourseType | null> => {
	const db = getRequestEvent().locals.db;

	return await db.transaction(async (tx) => {
		let course = await tx
			.select({
				id: schema.course.id,
				uuid: schema.course.uuid,
				description: schema.course.description,
				createdAt: schema.course.createdAt,
				modifiedAt: schema.course.modifiedAt,
				red: schema.course.red,
				green: schema.course.green,
				blue: schema.course.blue,
				name: schema.course.name,
				subject: schema.course.subject,
				archived: schema.course.archived,
			})
			.from(schema.course)
			.innerJoin(
				schema.userCourseLinker,
				eq(schema.course.id, schema.userCourseLinker.course), //join condition
			)
			.where(
				and(
					eq(schema.course.uuid, courseUuid),
					eq(schema.userCourseLinker.user, user ? user.id : -1),
				),
			);

		if (course.length === 0) {
			return null;
		}

		course[0].description = renderMarkdown(course[0].description);

		if (people) {
			const peopleData = await tx
				.select({
					uuid: schema.user.uuid,
					name: schema.user.name,
					surname: schema.user.surname,
					email: schema.user.email,
					degree: schema.user.degree,
					isOwner: schema.userCourseLinker.owner,
					isTeacher: schema.userCourseLinker.teacher,
				})
				.from(schema.user)
				.innerJoin(
					schema.userCourseLinker,
					eq(schema.user.id, schema.userCourseLinker.user),
				)
				.where(eq(schema.userCourseLinker.course, course[0].id));
			(course[0] as CourseType).people = peopleData;
		}

		if (assignments) {
			const assignmentsData = await tx
				.select({
					id: schema.assignment.id,
					uuid: schema.assignment.uuid,
					title: schema.assignment.title,
					description: schema.assignment.description,
					deadline: schema.assignment.deadline,
					createdAt: schema.assignment.createdAt,
					modifiedAt: schema.assignment.modifiedAt,
					authorUuid: schema.user.uuid,
					name: schema.user.name,
					surname: schema.user.surname,
					email: schema.user.email,
					degree: schema.user.degree,
				})
				.from(schema.assignment)
				.innerJoin(
					schema.user,
					eq(schema.user.id, schema.assignment.author),
				)
				.where(eq(schema.assignment.course, course[0].id));

			for (let i = 0; i < assignmentsData.length; i++) {
				assignmentsData[i].description = renderMarkdown(
					assignmentsData[i].description,
				);

				const commentsData = await tx
					.select({
						uuid: schema.assignmentComment.uuid,
						comment: schema.assignmentComment.comment,
						createdAt: schema.assignmentComment.createdAt,
						name: schema.user.name,
						surname: schema.user.surname,
						email: schema.user.email,
						degree: schema.user.degree,
						authorUuid: schema.user.uuid,
					})
					.from(schema.assignmentComment)
					.innerJoin(
						schema.user,
						eq(schema.user.id, schema.assignmentComment.author),
					)
					.where(
						eq(
							schema.assignmentComment.assignment,
							assignmentsData[i].id,
						),
					);
				(assignmentsData[i] as CourseAssignmentType).comments =
					commentsData.map((c) => {
						return {
							uuid: c.uuid,
							comment: c.comment,
							createdAt: c.createdAt,
							author: {
								uuid: c.authorUuid,
								name: c.name,
								surname: c.surname,
								email: c.email,
								degree: c.degree,
							},
						};
					});
			}

			(course[0] as CourseType).assignments = assignmentsData.map((a) => {
				return {
					uuid: a.uuid,
					title: a.title,
					description: a.description,
					deadline: a.deadline,
					createdAt: a.createdAt,
					author: {
						uuid: a.authorUuid,
						name: a.name,
						surname: a.surname,
						email: a.email,
						degree: a.degree,
					},
					id: undefined,
				};
			});
		}

		if (messages) {
			const messagesData = await tx
				.select({
					id: schema.courseMessage.id,
					uuid: schema.courseMessage.uuid,
					content: schema.courseMessage.content,
					createdAt: schema.courseMessage.createdAt,
					name: schema.user.name,
					surname: schema.user.surname,
					email: schema.user.email,
					degree: schema.user.degree,
					authorUuid: schema.user.uuid,
				})
				.from(schema.courseMessage)
				.innerJoin(
					schema.user,
					eq(schema.user.id, schema.courseMessage.author),
				)
				.where(eq(schema.courseMessage.course, course[0].id));

			for (let i = 0; i < messagesData.length; i++) {
				const commentsData = await tx
					.select({
						uuid: schema.courseMessageComment.uuid,
						comment: schema.courseMessageComment.comment,
						createdAt: schema.courseMessageComment.createdAt,
						name: schema.user.name,
						surname: schema.user.surname,
						email: schema.user.email,
						degree: schema.user.degree,
						authorUuid: schema.user.uuid,
					})
					.from(schema.courseMessageComment)
					.innerJoin(
						schema.user,
						eq(schema.user.id, schema.courseMessageComment.author),
					)
					.where(
						eq(
							schema.courseMessageComment.courseMessage,
							messagesData[i].id,
						),
					);
				(messagesData[i] as CourseMessageType).comments =
					commentsData.map((c) => {
						return {
							uuid: c.uuid,
							comment: c.comment,
							createdAt: c.createdAt,
							author: {
								uuid: c.authorUuid,
								name: c.name,
								surname: c.surname,
								email: c.email,
								degree: c.degree,
							},
						};
					});
			}

			(course[0] as CourseType).messages = messagesData.map((m) => {
				return {
					uuid: m.uuid,
					content: m.content,
					createdAt: m.createdAt,
					author: {
						uuid: m.authorUuid,
						name: m.name,
						surname: m.surname,
						email: m.email,
						degree: m.degree,
					},
					id: undefined,
				};
			});
		}

		return course[0] as CourseType;
	});
};
