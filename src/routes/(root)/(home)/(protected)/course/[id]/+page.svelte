<script lang="ts">
	import type { CourseType } from '$lib/types';
	import { m } from '$lib/paraglide/messages';
	import WideCard from '$component/WideCard.svelte';

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

<WideCard
	cssAddition="grow"
	r={data.course.red}
	g={data.course.green}
	b={data.course.blue}
>
	<h1 class="flex flex-row items-center gap-1">
		<i class="ri-file-list-3-line text-5xl"></i>
		{data.course.name}
	</h1>

	<span class="wrap-break-word overflow-hidden text-ellipsis">
	{JSON.stringify(data)}
	{JSON.stringify(data)}
	{JSON.stringify(data)}
	{JSON.stringify(data)}
	{JSON.stringify(data)}
	{JSON.stringify(data)}
	{JSON.stringify(data)}
	{JSON.stringify(data)}
	</span>
</WideCard>
