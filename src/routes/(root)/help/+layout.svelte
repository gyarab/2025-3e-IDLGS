<script lang="ts">
	import Sidebar from "./components/Sidebar.svelte";

	let {
		children
	} = $props();
</script>

<div class="flex flex-row grow w-full gap-2 overflow-hidden max-h-screen max-w-screen">
	<Sidebar />

	<div class="flex flex-col grow w-4/5 items-center text-black p-5 overflow-scroll">
		{@render children?.()}
	</div>
</div>