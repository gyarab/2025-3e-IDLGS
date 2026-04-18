<script lang="ts">
	import HoverEmoji from "./HoverEmoji.svelte";

	let {
		texts,
		labels,
		emojis,
		actions,
		answers,
		css,
		style,
		cssTop,
	}: {
		texts?: string[],
		labels?: string[],
		emojis?: string[],
		actions?: (() => void)[],
		answers?: string[],
		css?: string,
		style?: string,
		cssTop?: string,
	} = $props();

	let length = $derived(Math.max(texts?.length??0, labels?.length??0, emojis?.length??0, actions?.length??0, answers?.length??0));
</script>

{#key texts || actions || answers || emojis}
	<div class="{cssTop} text-white! flex flex-row *:first:rounded-s-full *:last:rounded-e-full *:rounded-none w-full *:border-white *:border *:border-collapse  *:first:border-s-0 *:last:border-e-0 *:border-b-0 *:border-t-0">
		{#each { length: length } as _, i}
			<button
				class="{css} hover:translate-0! grow font-bold flex flex-row justify-center items-center gap-1 p-2 ps-3 pe-3 hover:brightness-75 active:brightness-50"
				{style}
				onclick={actions?.at(i)??(() => {})}
				title={labels?.at(i)??""}
				aria-label={labels?.at(i)??""}
			>
				{#if emojis}
					<HoverEmoji emoji={emojis[i]} css="text-2xl" />
				{/if}
				{#if texts}
					{texts[i]}
				{/if}	
			</button>
		{/each}
	</div>
{/key}