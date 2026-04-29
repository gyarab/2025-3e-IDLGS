<script lang="ts">
	let {
		darkMode,
		color
	}: {
		darkMode: boolean;
		color: string;
	} = $props();
</script>

<div></div>

<!-- TODO navigation to next/prev article, chapter, ... -->
<div
	class="shadow-lg flex w-6/10 flex-row justify-center rounded-lg p-2 min-h-[30svh] {darkMode
		? 'bg-neutral-800 text-white'
		: 'bg-neutral-100 text-black'}"
>

</div>
