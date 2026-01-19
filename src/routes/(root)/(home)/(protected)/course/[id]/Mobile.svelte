<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { CourseType } from '$lib/types';
	import type { Snippet } from 'svelte';

	let {
		data,
		children,
	}: {
		data: {
			course: CourseType;
			isTeacher: boolean;
			isOwner: boolean;
		};
		children: Snippet;
	} = $props();
</script>

<div class="flex w-full grow flex-col xl:hidden"></div>

{@render children()}
