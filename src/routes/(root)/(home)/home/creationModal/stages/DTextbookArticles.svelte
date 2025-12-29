<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import NextPrevious from '../components/NextPrevious.svelte';

	let {
		step = $bindable(0),
		name, description, red, green, blue
	} = $props();
</script>

<div class="flex w-full grow flex-col gap-2">
	<h2>{m.textbookChaptersAndArticles()}</h2>
	<NextPrevious
		currentStep={3}
		maxStep={5}
		onclickLast={() => { step = 2; }}
		onclickNext={() => { step = 4; }}
		disableConditionNext={false}
	/>
</div>
