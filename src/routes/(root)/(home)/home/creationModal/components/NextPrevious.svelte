<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Button from '../../../../components/Button.svelte';

	let {
		currentStep,
		maxStep,
		onclickLast,
		onclickNext,
		disableConditionNext
	}: {
		currentStep: number;
		maxStep: number;
		onclickNext: () => void;
		onclickLast: () => void;
		disableConditionNext: boolean;
	} = $props();
</script>

<div class="flex w-full flex-row items-center gap-2">
	<Button
		btn="button-white"
		emoji="arrow-left-s"
		onclick={onclickLast}
	>
		{m.back()}
	</Button>

	<div class="grow"></div>

	<div class="flex flex-row items-center gap-1">
		<span class="">
			{m.step()}
		</span>
		<span class="">
			{currentStep}
		</span>
		<span class="opacity-70">
			{m.outOf()}
		</span>
		<span class="opacity-70">
			{maxStep}
		</span>
	</div>

	<div class="grow"></div>

	<Button
		btn="button-white"
		emoji="arrow-right-s"
		flip={true}
		onclick={onclickNext}
		disabled={disableConditionNext}
	>
		{m.next()}
	</Button>
</div>
