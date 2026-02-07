<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from './Button.svelte';

	let {
		children,
		//bg and text classes
		cssClass = 'bg-linear-to-tr from-violet-800 to-emerald-600 text-white',
		//background as text
		cssClass2 = 'text-violet-800',
		//bindable value with tooltip show
		showTooltip = $bindable(false),
		notButton = false,
	}: {
		children: Snippet;
		cssClass?: string;
		cssClass2?: string;
		showTooltip: boolean;
		notButton?: boolean;
	} = $props();
</script>

{#if showTooltip}
	<div
		class="absolute top-0 left-0 z-30 flex w-full -translate-y-[calc(100%+0.4rem)] flex-col items-center justify-center font-light!"
	>
		<span
			class="{cssClass2} absolute bottom-0 left-0 flex w-full translate-y-0.5 flex-col items-center justify-center text-3xl"
		>
			<i class="ri-arrow-down-s-fill absolute"></i>
		</span>
		{#if notButton}
			<div
				class="flex flex-col {cssClass} rounded! p-2! text-center! font-light!"
			>
				{@render children()}
			</div>
		{:else}
			<Button
				cssClass="flex flex-col {cssClass} p-0 rounded! font-light! text-center!"
				emoji=""
				btn="button-none"
				onclick={() => {
					showTooltip = false;
				}}
			>
				{@render children()}
			</Button>
		{/if}
	</div>
{/if}
