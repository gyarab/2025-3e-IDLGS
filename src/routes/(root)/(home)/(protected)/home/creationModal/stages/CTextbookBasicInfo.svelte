<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import NextPrevious from '../components/NextPrevious.svelte';
	import Textarea from '$component/Textarea.svelte';
	import { MAX_TEXTBOOK_LETTERS } from '$lib';

	let {
		step = $bindable(0),
		name = $bindable(''),
		description = $bindable(''),
		red = $bindable(0),
		green = $bindable(0),
		blue = $bindable(0),
		subject = $bindable(''),
	} = $props();

	let color = $state('#6507cf'); //bg-violet-900
	$effect(() => {
		red = parseInt(color.slice(1, 3), 16);
		green = parseInt(color.slice(3, 5), 16);
		blue = parseInt(color.slice(5, 7), 16);
	});
</script>

<div class="flex w-full grow flex-col gap-2">
	<h2>{m.generalTextbookSettings()}</h2>
	<div class="flex flex-row items-center gap-2">
		<h2 class="text-xl">{m.textbookName()}:</h2>
		<input
			type="text"
			class="input-text"
			maxlength={MAX_TEXTBOOK_LETTERS}
			bind:value={name}
			placeholder={m.enterTextbookName()}
		/>
	</div>
	<div class="flex flex-row items-center gap-2">
		<h2 class="text-xl">{m.textbookSubject()}:</h2>
		<input
			type="text"
			class="input-text"
			maxlength={MAX_TEXTBOOK_LETTERS}
			bind:value={subject}
			placeholder={m.enterTextbookSubject()}
		/>
	</div>
	<div class="flex flex-row items-center gap-2">
		<h2 class="text-xl">{m.textbookColor()}:</h2>
		<input
			type="color"
			bind:value={color}
			class="input-color"
		/>
		<span class="opacity-50">
			{color}
		</span>
	</div>
	<div class="flex grow flex-col gap-2">
		<h2 class="text-xl">{m.textbookDescription()}:</h2>
		<Textarea
			bind:value={description}
			placeholder={m.enterTextbookDescription()}
		/>
	</div>
	<NextPrevious
		currentStep={1}
		maxStep={4}
		onclickLast={() => {
			step = 0;
		}}
		onclickNext={() => {
			step = 3;
		}}
		disableConditionNext={description.length == 0 || name.length == 0}
	/>
</div>
