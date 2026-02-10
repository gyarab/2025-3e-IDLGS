import { schema } from '$lib/server/db/mainSchema';
import { getRequestEvent } from '$app/server';
import { and, eq } from 'drizzle-orm';
import { type SchoolLessonPlanType } from '$lib/types';

//TODO all information about whole lesson plan, for school administration

export const loadSchoolLessonPlan = async () => {
	//TODO
};