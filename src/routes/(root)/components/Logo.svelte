<script lang="ts">
	let {
		whiteBackground = true
	} = $props();
</script>

<!-- TODO normal logo, this is temporary -->
<a class="flex flex-row gap-0 text-2xl font-bold items-center justify-center" href='/'>
	<i class="{whiteBackground ? 'text-violet-700' : 'text-white'} ri-book-ai-fill"></i>
	<span class="text-emerald-500">I</span>
	<span class="{whiteBackground ? 'text-violet-700' : 'text-white'}">D</span>
	<span class="{whiteBackground ? 'text-violet-700' : 'text-white'}">L</span>
	<span class="text-emerald-500">G</span>
	<span class="{whiteBackground ? 'text-violet-700' : 'text-white'}">S</span>
</a>

<!--
<a href="/">
			<img
				src="??"
				alt="Logo of IDLGS"
			/>
		</a>
-->