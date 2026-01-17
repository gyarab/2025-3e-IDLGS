<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';

	//themes defined in src/app.css, in order
	const colorList = [
		"bg-red-700",
		"bg-orange-700",
		"bg-yellow-700",
		"bg-green-700",
		"bg-teal-700",
		"bg-blue-700",
		"bg-indigo-700",
		"bg-purple-700",
		"bg-emerald-700",
		"bg-cyan-700",
		"bg-pink-700",
	];

	let { 
		selectedColor = $bindable('') 
	}: {
		selectedColor: string;
	} = $props();
</script>

<div class="flex flex-row">
	{#each colorList as color (color)}
		<div>
			<!-- TODO -->
		</div>
	{/each}
</div>