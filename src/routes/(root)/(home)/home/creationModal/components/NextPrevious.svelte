<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Button from '../../../../components/Button.svelte';

	let {
		currentStep,
		maxStep,
		onclickLast,
		onclickNext,
		disableConditionNext,
		message = ""
	}: {
		currentStep: number;
		maxStep: number;
		onclickNext: () => void;
		onclickLast: () => void;
		disableConditionNext: boolean;
		message?: string;
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

	<div class="flex flex-col items-center gap-0">
		<div class="flex flex-row items-center gap-1">
			<span class="">
				{m.step()}
			</span>
			<span class="">
				{currentStep}
			</span>
			<span class="opacity-50">
				{m.outOf()}
			</span>
			<span class="opacity-50">
				{maxStep}
			</span>
		</div>
		<div class="flex flex-row items-center gap-1 opacity-50">
			{message}.
		</div>
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
