<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import NextPrevious from '../components/NextPrevious.svelte';

	let {
		step = $bindable(0),
		name = $bindable(""), description = $bindable(""), red = $bindable(0), green = $bindable(0), blue = $bindable(0)
	} = $props();

	let color = $state("#dd00dd");
	$effect(() => {

	})
</script>


<div class="flex w-full grow flex-col gap-2">
	<h2>{m.generalTextbookSettings()}</h2>
	<div class="flex flex-row gap-2 items-center">
		<h2 class="text-xl">{m.textbookName()}</h2>
		<input type="text" class="input-text" bind:value={name} placeholder={m.enterTextbookName()} />
	</div>
	<div class="flex flex-row gap-2 items-center">
		<h2 class="text-xl">{m.textbookColor()}</h2>
		<input type="color" bind:value={color} placeholder={m.enterTextbookName()} />
		<span class="opacity-50">
			{color}
		</span>
	</div>
	<div class="grow flex flex-col gap-2">
		<h2 class="text-xl">{m.textbookDescription()}</h2>
		<textarea class="input-text grow" bind:value={description} placeholder={m.enterTextbookDescription()}></textarea>
	</div>
	<NextPrevious
		currentStep={2}
		maxStep={5}
		onclickLast={() => { step = 0; }}
		onclickNext={() => { step = 3; }}
		disableConditionNext={
			description.length == 0 ||
			name.length == 0
		}
	/>
</div>
