<script lang="ts">
	import { disableScroll, enableScroll } from '$lib';
	import { fade } from 'svelte/transition';

	let {
		children,
		showModal = $bindable(),
		cssClass = '',
		cssStyle = '',
		maxHeight = true,
	} = $props();
	let dialog: HTMLDialogElement | undefined = $state();
	let clickable: HTMLDivElement | undefined = $state();

	$effect(() => {
		if (showModal) {
			dialog?.showModal();
			disableScroll();
		} else {
			dialog?.close();
			enableScroll();
		}
	});
</script>

{#key showModal}
	<div class="absolute! z-45! m-0! h-0! w-0! p-0! *:bg-transparent">
		<dialog
			transition:fade|global={{ duration: 250 }}
			bind:this={dialog}
			onclose={() => (showModal = false)}
			onclick={(e) => {
				if (!clickable?.contains(e.target as Node)) {
					showModal = false; //effect takes care of stuff
				}
			}}
			class="min-h-screen w-screen max-w-screen
		min-w-screen backdrop-brightness-50"
		>
			<div
				class="flex min-h-screen w-full grow flex-col items-center justify-center"
			>
				<div
					bind:this={clickable}
					class="
						{cssClass ? cssClass : 'bg-white!'} 
						{maxHeight ? 'grow max-xl:h-screen' : ''}
						mt-5 mb-5 flex max-w-4/5 flex-col rounded-2xl text-left text-white max-xl:w-screen max-xl:min-w-9/10 xl:max-h-[66svh] xl:min-w-2/3 xl:p-5
			"
					style={cssStyle}
				>
					{@render children?.()}
				</div>
			</div>
		</dialog>
	</div>
{/key}
