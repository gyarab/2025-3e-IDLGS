<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Desktop from './Desktop.svelte';
	import Mobile from './Mobile.svelte';
	import type { CourseType, TextbookType, UserType } from '$lib/types';

	let {
		data,
	}: {
		data: {
			courses: Promise<CourseType[]>;
			textbooks: Promise<TextbookType[]>;
			user: UserType;
		};
	} = $props();
</script>

<svelte:head>
	<title>
		{m.overview()} - {m.textbookNameShort()}
	</title>
</svelte:head>

<Desktop {data} />
<Mobile {data} />
