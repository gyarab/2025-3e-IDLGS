<script lang="ts">
	let {
		name,
		icon,
		onclick
	}: {
		name: string,
		icon: string,
		onclick: (e: MouseEvent) => void
	} = $props();
</script>

<button 
	class="flex flex-col gap-2 items-center justify-center p-2 rounded-lg bg-neutral-500 group hover:bg-emerald-500"
	onclick={(e) => onclick(e)}
	>
	<span class="flex flex-col gap-2 text-2xl">
		<i class="ri-{icon}-fill group-hover:hidden"></i>
		<i class="ri-{icon}-line not-group-hover:hidden"></i>
	</span>
	<h4>{name}</h4>
</button>