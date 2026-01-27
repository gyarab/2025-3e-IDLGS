<script lang="ts">
	import WideCard from '$component/WideCard.svelte';
	import type { CourseType } from '$lib/types';

	let {
		data,
	}: {
		data: {
			course: CourseType;
			isTeacher: boolean;
			isOwner: boolean;
		};
	} = $props();
</script>

<div class="w-1/5 min-w-1/5 p-2">
	<WideCard cssAddition="grow w-full">
		<h2>{data.course.name}</h2>
	</WideCard>
</div>
