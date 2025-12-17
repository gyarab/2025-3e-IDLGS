<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { children, showModal = $bindable(), cssClass = '' } = $props();
	let dialog: HTMLDialogElement | undefined = $state();
	let clickable: HTMLDivElement | undefined = $state();

	onMount(() => {
		if (showModal) dialog?.showModal();
		else dialog?.close();
	});

	$effect(() => {
		if (showModal) dialog?.showModal();
		else dialog?.close();
	});
</script>

{#key showModal}
	<div class="absolute! m-0! h-0! w-0! p-0! *:bg-transparent">
		<dialog
			transition:fade|global={{ duration: 250 }}
			bind:this={dialog}
			onclose={() => (showModal = false)}
			onclick={(e) => {
				if (!clickable?.contains(e.target as Node)) dialog?.close();
			}}
			class="min-h-screen w-screen max-w-screen min-w-screen
		backdrop:bg-linear-to-tr backdrop:black/70"
		>
			<div class=" flex min-h-screen w-full grow flex-col items-center justify-center">
				<div
					bind:this={clickable}
					class="
				{cssClass
						? cssClass
						: 'bg-white!'} mt-5 mb-5 flex max-w-4/5 grow flex-col rounded-2xl lg:p-5 text-left text-white max-lg:min-w-9/10 lg:min-w-2/3 max-lg:w-screen max-lg:h-screen lg:max-h-[66svh]
			"
				>
					{@render children?.()}
				</div>
			</div>
		</dialog>
	</div>
{/key}
