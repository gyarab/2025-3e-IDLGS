<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { RElement } from '$lib/interactive/element.svelte';
	import { getType } from '$lib/interactive/interactive.svelte';
	import ResinModal from './ResinModal.svelte';
	import ResinScriptEditor from './script/ResinScriptEditor.svelte';

	let {
		el,
		canvasX,
		canvasY,
		snappingAllowed,
	}: {
		el: RElement;
		canvasX: number;
		canvasY: number;
		snappingAllowed: boolean;
	} = $props();

	let showScriptingModal = $state(false);

	let maxRoundnessLimit = $derived(
		Math.trunc(
			Math.min(el.width * 0.01 * canvasX, el.height * 0.01 * canvasY) / 2,
		),
	);
</script>

<div
	class="flex max-h-screen max-w-2/10 flex-col gap-2 overflow-hidden bg-neutral-500 p-5 *:w-full *:max-w-full"
>
	<h3>{m.manageElement()}</h3>

	<span class="flex w-full flex-row items-center gap-2">
		{m.nameOfElement()}:
		<div class="grow"></div>
		<input
			type="text"
			bind:value={el.name}
			class="input-text-resin"
		/>
	</span>

	<span class="flex w-full flex-row items-center gap-2">
		{m.typeOfElement()}:
		<div class="grow"></div>
		{getType(el)}
	</span>

	<button
		class="button-green group"
		onclick={() => {
			showScriptingModal = true;
		}}
	>
		<i class="ri-code-box-line text-xl not-group-hover:hidden"></i>
		<i class="ri-code-box-fill text-xl group-hover:hidden"></i>
		{m.openElementScriptEditor()}
	</button>

	<h3>{m.sizeAndPosition()}</h3>

	<span class="flex w-full flex-row items-center gap-2">
		{m.width()}:
		<div class="grow"></div>
		{el.width.toFixed()}%
	</span>

	<span class="flex w-full flex-row items-center gap-2">
		{m.height()}:
		<div class="grow"></div>
		{el.height.toFixed()}%
	</span>

	<span class="flex w-full flex-row items-center gap-2">
		{m.leftmostX()}:
		<div class="grow"></div>
		{el.x.toFixed()}%
	</span>

	<span class="flex w-full flex-row items-center gap-2">
		{m.topmostY()}:
		<div class="grow"></div>
		{el.y.toFixed()}%
	</span>

	<h3>{m.appearance()}</h3>

	<span class="flex w-full flex-row items-center gap-2">
		{m.backgroundColor()}
		<div class="grow"></div>
		<input
			type="color"
			bind:value={el.bgcolor}
		/>
	</span>

	<div class="flex w-full flex-row items-center gap-2">
		{m.textColor()}
		<div class="grow"></div>
		<input
			type="color"
			bind:value={el.fgcolor}
		/>
	</div>

	<div class="flex w-full max-w-full flex-row items-center gap-2">
		<span>
			{m.roundness()}
		</span>
		<span>
			{el.rounded}px/{maxRoundnessLimit}px
		</span>
		<input
			type="range"
			class="w-fit! grow! p-0"
			min="0"
			max={maxRoundnessLimit}
			bind:value={el.rounded}
		/>
	</div>

	<div class="flex w-full flex-row items-center gap-2">
		<span>
			{m.opacity()}
		</span>
		<span>
			{Math.round(el.opacity * 100)}%
		</span>
		<input
			type="range"
			class="w-fit! grow! p-0"
			min="0"
			max="1"
			step="0.01"
			bind:value={el.opacity}
		/>
	</div>

	<div class="flex w-full flex-row items-center gap-2">
		{m.visible()}?
		<div class="grow"></div>
		<input
			type="checkbox"
			class="input-checkbox"
			bind:checked={el.visible}
		/>
	</div>

	<div class="grow"></div>
	<p class="italic opacity-80">
		{JSON.stringify(el)}
	</p>
</div>

<ResinModal bind:showModal={showScriptingModal}>
	<ResinScriptEditor
		bind:closeModal={showScriptingModal}
		{snappingAllowed}
	/>
</ResinModal>
