<script lang="ts">
	//TODO redirects from assignments with specific grades highlighted using URL params
	import { m } from '$lib/paraglide/messages';
	import type {
		UserType,
		CourseType,
		CourseGradeValueType,
	} from '$lib/types';

	let {
		data,
	}: {
		data: {
			user: UserType;
			course: CourseType;
			grades: CourseGradeValueType[];
		};
	} = $props();
</script>
