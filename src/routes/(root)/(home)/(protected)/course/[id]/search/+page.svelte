<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import WideCard from '$component/WideCard.svelte';
	import type { CourseQuestionType, CourseType } from '$lib/types';
	import TextInput from '$src/routes/(root)/components/TextInput.svelte';

	let {
		data,
	}: {
		data: {
			course: CourseType;
			questions: CourseQuestionType[];
		};
	} = $props();

	let query = $state('');
</script>

<svelte:head>
	<title>
		{m.search()} - {data.course.name} - {m.textbookNameShort()}
	</title>
</svelte:head>

<WideCard
	cssAddition="grow"
	r={80 + data.course.red / 5}
	g={80 + data.course.green / 5}
	b={80 + data.course.blue / 5}
>
	<div class="flex flex-row items-end gap-2">
		<h1>{data.course.name}</h1>
		<h2>{m.search()}</h2>
	</div>

	<TextInput
		placeholder={m.enterSearchQuery()}
		bind:value={query}
		maxLength={30}
	/>
</WideCard>
