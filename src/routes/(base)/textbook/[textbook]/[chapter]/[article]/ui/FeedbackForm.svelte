<script lang="ts">
	let {
		darkMode,
		color,
	}: {
		darkMode: boolean;
		color: string;
	} = $props();
</script>

<div></div>

<!-- TODO feedback form per chapter, "what did you learn" -->
<div
	class="flex min-h-[30svh] w-6/10 flex-row justify-center rounded-lg p-2 shadow-lg {darkMode
		? 'bg-neutral-800 text-white'
		: 'bg-neutral-100 text-black'}"
></div>
