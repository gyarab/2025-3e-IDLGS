<script lang="ts">
	import type { RElement } from '$lib/interactive/element.svelte';
	import ResinModal from './ResinModal.svelte';
	import ResinScriptEditor from './ResinScriptEditor.svelte';

	let {
		el
	}: {
		el: RElement;
	} = $props();

	let showScriptingModal = $state(false);
</script>

<div class="flex max-h-screen flex-col gap-2 overflow-hidden bg-neutral-500 p-5">
	<h3>Manage element</h3>

	<button
		class="button-green group"
		onclick={() => {
			showScriptingModal = true;
		}}
	>
		<i class="ri-code-box-line text-xl not-group-hover:hidden"></i>
		<i class="ri-code-box-fill text-xl group-hover:hidden"></i>
		Open script
	</button>

	<h3>Size information</h3>

	<span class="flex w-full flex-row items-center gap-2">
		Width:
		<div class="grow"></div>
		{el.width.toFixed()}%
	</span>

	<span class="flex w-full flex-row items-center gap-2">
		Height:
		<div class="grow"></div>
		{el.height.toFixed()}%
	</span>

	<span class="flex w-full flex-row items-center gap-2">
		Leftmost X:
		<div class="grow"></div>
		{el.x.toFixed()}%
	</span>

	<span class="flex w-full flex-row items-center gap-2">
		Topmost Y:
		<div class="grow"></div>
		{el.y.toFixed()}%
	</span>
	
	<h3>Graphical settings</h3>

	<span class="flex w-full flex-row items-center gap-2">
		Background color
		<div class="grow"></div>
		<input type="color" bind:value={el.bgcolor} />
	</span>

	<span class="flex w-full flex-row items-center gap-2">
		Foreground color
		<div class="grow"></div>
		<input type="color" bind:value={el.fgcolor} />
	</span>

	<!-- TODO limit according to size -->
	<span class="flex w-full flex-row items-center gap-2">
		Roundness
		<div class="grow"></div>
		<input type="range" min='0' max='100' bind:value={el.rounded} />
	</span>

	<span class="flex w-full flex-row items-center gap-2">
		Opacity
		<div class="grow"></div>
		<input type="range" min='0' max='1' step='0.01' bind:value={el.opacity} />
	</span>

	<span class="flex w-full flex-row items-center gap-2">
		Is visible?
		<div class="grow"></div>
		<input type="checkbox" bind:checked={el.visible} />
	</span>

	<div class="grow"></div>
	<p class="italic opacity-70">
		{JSON.stringify(el)}
	</p>
</div>

<ResinModal bind:showModal={showScriptingModal}>
	<ResinScriptEditor bind:closeModal={showScriptingModal} />
</ResinModal>
