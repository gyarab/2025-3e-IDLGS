<!-- src/lib/components/ToastContainer.svelte -->
<script lang="ts">
	import { toasts } from '$lib/toast';
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';

	const typeStyles = {
		error: 'bg-red-600 border-red-800 text-white',
		success: 'bg-emerald-600 border-emerald-800 text-white',
		info: 'bg-neutral-400 border-neutral-400 text-white',
		// info: 'bg-slate-200 border-slate-300 text-slate-800 shadow-sm',
	};
</script>

<div class="fixed right-4 bottom-4 z-50 flex w-full max-w-xs flex-col gap-2">
	{#each $toasts as toast (toast.id)}
		<div
			animate:flip
			in:fly={{ x: 50, duration: 300 }}
			out:fade
			class="flex items-center justify-between rounded-lg border-l-4 p-4 text-white shadow-lg {typeStyles[toast.type]}"
		>
			<span class="text-sm font-medium">{toast.message}</span>
			<button
				on:click={() =>
					toasts.update((all) =>
						all.filter((t) => t.id !== toast.id),
					)}
				class="ml-4 opacity-70 hover:opacity-100"
			>
				✕
			</button>
		</div>
	{/each}
</div>
