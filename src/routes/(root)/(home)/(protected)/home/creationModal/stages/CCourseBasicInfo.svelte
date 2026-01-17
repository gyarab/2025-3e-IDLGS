<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import NextPrevious from '../components/NextPrevious.svelte';

	let {
		step = $bindable(0),
		name = $bindable(''),
		description = $bindable(''),
		red = $bindable(0),
		green = $bindable(0),
		blue = $bindable(0),
		subject = $bindable(''),
	} = $props();
</script>

<!-- TODO incl. next condition -->

<div class="flex w-full grow flex-col gap-2">
	<h2>{m.generalCourseSettings()}</h2>
	<div class="grow"></div>
	<NextPrevious 
		currentStep={2}
		maxStep={5}
		onclickLast={() => {
			step = 1;
		}}
		onclickNext={() => {
			step = 3;
		}}
		disableConditionNext={false}
	/>
</div>
