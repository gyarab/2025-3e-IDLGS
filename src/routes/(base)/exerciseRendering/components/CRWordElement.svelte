<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		length,
		offset,
		children,
		columnId,
	}: {
		length: number;
		offset: number;
		children: Snippet,
		columnId: number;
	} = $props();
</script>

{#key offset}
<div class="flex flex-row gap-0">
	{#each { length: offset } as _, i (i)}
		<div class="w-16"></div>
	{/each}
	{@render children()}
	{#each { length: length } as _, i (i)}
		<div
			class="{columnId == i - offset ? "border-black! text-black!" : ""} overflow-hidden flex aspect-square w-16 max-w-16 flex-col items-center justify-center border-2 text-xl">
			<input
				type="text"
				maxlength="1"
				size="1"
				autocapitalize="on"
				class="border-0 appearance-none text-2xl font-bold w-full max-w-full text-center"
			/>
		</div>
	{/each}
</div>
{/key}