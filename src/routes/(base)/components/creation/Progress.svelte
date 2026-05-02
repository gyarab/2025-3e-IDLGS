<script lang="ts">
	import { fly } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages';
	import ProgressItem from './ProgressItem.svelte';
	import SelectionButton from '$src/routes/(base)/components/SelectionButton.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { darkenHex, setDarkMode } from '$lib';

	let {
		stage = $bindable(0),
		color,
		darkMode,
		texts,
		title,
		backLink,
		helpLink,
		emoji,
	}: {
		stage: number;
		color: string;
		darkMode: boolean;
		texts: string[];
		title: string;
		backLink: string;
		helpLink: string;
		emoji: string;
	} = $props();
</script>

<div
	class="flex max-w-1/5 min-w-40 grow flex-col gap-2 rounded-e-2xl p-4 shadow-lg {darkMode
		? 'bg-neutral-900'
		: 'bg-neutral-300'}"
	in:fly|global={{ duration: 300, delay: 300, x: -500, y: 0, opacity: 0 }}
>
	<div class="relative flex w-full flex-col gap-2">
		<div class="flex w-full flex-row items-center gap-1 text-2xl">
			<i class={emoji}></i>
			<h1 class="mb-0! text-2xl! font-bold">{title}</h1>
		</div>

		{#key stage}
			{#each texts as text, i (i)}
				<ProgressItem
					{color}
					{text}
					current={stage === i}
					done={stage > i}
				/>
			{/each}
		{/key}
	</div>

	<div class="grow"></div>

	<SelectionButton
		style="background-color: {darkenHex(color, 50)};"
		texts={[m.cancel(), '', '']}
		emojis={['arrow-left-double', 'question', darkMode ? 'sun' : 'moon']}
		labels={[
			m.cancel(),
			m.helpMenu(),
			darkMode ? m.lightMode() : m.darkMode(),
		]}
		actions={[
			() => goto(backLink),
			() => goto(helpLink),
			async () => {
				await setDarkMode(!darkMode);
				await invalidateAll();
			},
		]}
	/>
</div>
