<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import NextPrevious from '../components/NextPrevious.svelte';

	let { 
		step = $bindable(0),
		selected
	}: {
		step: number,
		selected: string,
	} = $props();
</script>

<div class="flex w-full grow flex-col gap-2">
	<h2>{selected == 'course' ? m.addPeopleToCourse() : m.addAuthorsToTextbook()}</h2>
	<div class="grow"></div>
	<NextPrevious
		currentStep={selected == 'course' ? 4 : 3}
		maxStep={selected == 'course' ? 5 : 4}
		onclickLast={() => {
			step = 3;
		}}
		onclickNext={() => {
			step = 5;
		}}
	/>
</div>
