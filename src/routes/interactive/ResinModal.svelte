<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	let { children, showModal = $bindable(), cssClass = "" } = $props();
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
	<div class="absolute! w-0! h-0! p-0! m-0! *:bg-transparent">
		<dialog
			transition:fade|global={{ duration: 250 }}
			bind:this={dialog}
			onclose={() => (showModal = false)}
			onclick={(e) => {
				if (!clickable?.contains(e.target as Node)) dialog?.close();
			}}
			class="max-w-screen w-screen min-h-screen min-w-screen
		backdrop:bg-linear-to-tr backdrop:from-violet-700/70 backdrop:to-emerald-500/70"
		>
			<div
				class=" w-full flex flex-col justify-center items-center grow min-h-screen"
			>
				<div
					bind:this={clickable}
					class="
				{cssClass
						? cssClass
						: 'bg-neutral-500!'} flex flex-col p-5 text-left rounded-2xl max-w-4/5 mt-5 mb-5 text-white max-lg:min-w-9/10 lg:min-w-2/3 grow
			"
				>
					{@render children?.()}
				</div>
			</div>
		</dialog>
	</div>
{/key}