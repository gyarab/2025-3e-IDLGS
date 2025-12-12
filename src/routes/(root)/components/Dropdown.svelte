<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let inUse = $state(false);

	let { children, content, icon, downDirection, css, } = $props();

	let ready = $state(false);
	onMount(() => {
		ready = true;
	});
</script>

{#if ready}
	{#key ready}
		<button
			class="{css} relative flex flex-row gap-1 hover:brightness-100! **:font-light"
			onclick={() => {
				inUse = !inUse;
			}}
			onmouseenter={() => {
				inUse = true;
			}}
			onmouseleave={() => {
				inUse = false;
			}}
		>
			<i class="ri-{icon}-line not-group-hover:hidden"></i>
			<i class="ri-{icon}-fill group-hover:hidden"></i>
			{content}
			{#if inUse}
				<i class="ri-arrow-up-fill"></i>
			{:else}
				<i class="ri-arrow-down-fill"></i>
			{/if}

			<div
				class="
				{inUse ? '' : 'hidden'}
				absolute right-0 z-50! min-w-full rounded-lg bg-white
				{downDirection ? 'top-10' : 'top-0 -translate-y-full'}
			"
				onmouseenter={() => {
					inUse = true;
				}}
				onmouseleave={() => {
					inUse = false;
				}}
				role="menu"
				tabindex="-1"
			>
				{@render children?.()}
			</div>
		</button>
	{/key}
{/if}