<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Desktop from './Desktop.svelte';
	import Mobile from './Mobile.svelte';
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

<svelte:head>
	<title>
		{m.myGrades()} - {m.textbookNameShort()}
	</title>
</svelte:head>

<Desktop {data} />
<Mobile {data} />
