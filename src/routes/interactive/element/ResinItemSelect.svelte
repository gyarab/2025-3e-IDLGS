<script lang="ts">
	let {
		name,
		icon,
		onclick,
	}: {
		name: string;
		icon: string;
		onclick: (e: MouseEvent) => void;
	} = $props();
</script>

<button
	class="group flex flex-col items-center justify-center gap-2 rounded bg-neutral-500 p-2 hover:bg-emerald-600"
	onclick={(e) => onclick(e)}
>
	<span class="flex flex-col gap-2 text-2xl">
		<i class="ri-{icon}-fill group-hover:hidden"></i>
		<i class="ri-{icon}-line not-group-hover:hidden"></i>
	</span>
	<h4 class="w-full overflow-scroll text-nowrap text-ellipsis">{name}</h4>
</button>
