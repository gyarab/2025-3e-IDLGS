<!--

RESIN
Script editor window
Author: Martin Bykov

-->

<script lang="ts">
	import ResinScriptBlock from "./ResinScriptBlock.svelte";

	let {
		closeModal = $bindable()
	}: {
		closeModal: boolean
	} = $props();
</script>

<div class="flex w-full grow flex-col gap-2">
	<h2>Scripting</h2>

	<div
		class="flex w-full flex-row overflow-x-scroll overflow-y-hidden border-t border-b border-white p-2"
	>
		<span> Select block: </span>
		<!-- TODO all blocks, categories -->
	</div>

	<div class="relative flex w-full grow flex-col rounded-2xl bg-neutral-600 p-5">
		<!-- TODO -->

		<ResinScriptBlock />
		
	</div>

	<div class="flex flex-row gap-2 w-full">
		<button class="button-green group">
			<i class="not-group-hover:hidden ri-save-3-line"></i>
			<i class="group-hover:hidden ri-save-3-fill"></i>
			Validate and save
		</button>
		<button class="button-violet group">
			<i class="not-group-hover:hidden ri-save-3-line"></i>
			<i class="group-hover:hidden ri-save-3-fill"></i>
			Help and documentation
		</button>
		<div class="grow"></div>
		<!-- TODO confirm modal -->
		<button class="button-violet group" onclick={() => closeModal = false}>
			<i class="not-group-hover:hidden ri-delete-bin-line"></i>
			<i class="group-hover:hidden ri-delete-bin-fill"></i>
			Discard changes
		</button>
	</div>
</div>
