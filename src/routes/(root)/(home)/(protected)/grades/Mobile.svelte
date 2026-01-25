<script lang="ts">
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
			courses: CourseType[];
			grades: CourseGradeValueType[][];
		};
	} = $props();
</script>

<div class="flex w-full grow flex-col xl:hidden"></div>
