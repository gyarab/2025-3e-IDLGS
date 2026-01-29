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

<div class="sticky xl:top-[6vh] left-0 h-[94svh] min-w-1/5 overflow-clip p-2">
	<WideCard 
		cssAddition="grow"
		r={data.course.red}
		g={data.course.green}
		b={data.course.blue}
	>
		<h2>{data.course.name}</h2>
	</WideCard>
</div>
