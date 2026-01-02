<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import NextPrevious from '../components/NextPrevious.svelte';

	let {
		step = $bindable(0), 
		selectedTextbookUuid = $bindable("")
	 }: {
		step: number;
		selectedTextbookUuid: string;
	 } = $props();
</script>

<div class="flex w-full grow flex-col gap-2">
	<h2>{m.selectTextbook()}</h2>
	<div class="grow"></div>
	<NextPrevious
		currentStep={1}
		maxStep={5}
		onclickLast={() => {
			step = 0;
		}}
		onclickNext={() => {
			step = 2;
		}}
		disableConditionNext={selectedTextbookUuid.length == 0}
	/>
</div>
