<script lang="ts">
	import type { CourseType, TextbookType, UserType } from '$lib/types';
	import { m } from '$lib/paraglide/messages';

	let {
		data,
	}: {
		data: {
			courses: Promise<CourseType[]>;
			textbooks: Promise<TextbookType[]>;
			user: UserType;
		};
	} = $props();

	let searchValue = $state('');
</script>

<div class="xl:hidden">
	
</div>
