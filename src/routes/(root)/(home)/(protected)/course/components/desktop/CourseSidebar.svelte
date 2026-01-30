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

<div class="sticky left-0 h-[94svh] min-w-1/5 overflow-clip p-2 xl:top-[6vh]">
	<WideCard
		cssAddition="grow"
		r={data.course.red}
		g={data.course.green}
		b={data.course.blue}
	>
		<h2 class="flex flex-row items-center gap-1">
			<i class="ri-file-list-3-line text-3xl"></i>
			{data.course.name}
		</h2>

		{#if data.isOwner || data.isTeacher}{:else}{/if}
	</WideCard>
</div>
