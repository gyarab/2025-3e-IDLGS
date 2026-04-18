<script lang="ts">
	import { type Snippet } from "svelte";

	let {
		children,
		data
	}: {
		children: Snippet,
		data: {
			color: string,
			darkMode: boolean
		},
	} = $props();

	let darkMode = $derived(data.darkMode);
</script>

<div class="relative flex flex-col grow w-screen min-h-screen overflow-x-hidden overflow-y-scroll items-center **:z-5">
	{@render children()}
</div>

