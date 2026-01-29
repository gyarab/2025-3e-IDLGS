import type { UserType } from '$lib/types';
import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { loadSingleCourse } from '$lib/server/loaders/course';

export const load = async (event) => {
	const user = (await event.parent()).user as UserType | undefined;

	if (user && !user.setPassword) {
		redirect(303, '/set');
	}

	const courseUuid = event.params.id as string;
	const course = await loadSingleCourse(user, courseUuid, true, true);

	if (!user) {
		redirect(303, '/login');
	}
	if (!course) {
		throw error(404, 'Not found');
	}

	return {
		course: course,
		isTeacher: course.people!.some(
			(person) => person.uuid === user?.uuid && person.isEditor,
		),
		isOwner: course.people!.some(
			(person) => person.uuid === user?.uuid && person.isOwner,
		),
	};
};
