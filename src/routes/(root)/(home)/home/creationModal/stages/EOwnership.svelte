<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import NextPrevious from '../components/NextPrevious.svelte';

	let {
		step = $bindable(0),
		selected,
	}: {
		step: number;
		selected: string;
	} = $props();

	//TODO write user email/name+surname, then search in DB using fetch after button click
	//not with every character but timeout when character not written
</script>

<div class="flex w-full grow flex-col gap-2">
	<h2>
		{selected == 'course'
			? m.addPeopleToCourse()
			: m.addAuthorsToTextbook()}
	</h2>
	<div class="flex grow flex-col gap-2"></div>
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
