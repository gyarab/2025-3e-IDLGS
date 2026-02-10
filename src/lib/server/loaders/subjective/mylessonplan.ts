import { schema } from '$lib/server/db/mainSchema';
import { getRequestEvent } from '$app/server';
import { and, eq } from 'drizzle-orm';
import { type UserLessonPlanType } from '$lib/types';

//TODO lesson plan only for user

export const loadMyLessonPlan = async () => {
	//TODO
};