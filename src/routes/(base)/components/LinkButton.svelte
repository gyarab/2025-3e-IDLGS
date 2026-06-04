<script lang="ts">
	let { 
		darkMode = false, 
		href, 
		text = href,
		icon
	}: {
        darkMode?: boolean;
        href: string;
        text: string;
        icon?: string;
    } = $props();
</script>

<a
	{href}
	class="inline-flex gap-2 rounded-2xl border px-4 py-2
        font-normal transition-colors {darkMode
		? 'border-white/20 bg-neutral-700/60 hover:bg-neutral-700'
		: 'border-black/20 bg-neutral-100 hover:bg-neutral-200'}"
>
	<i class="ri-{icon}-line"></i>
	<span>{text}</span>
</a>