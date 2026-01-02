<script lang="ts">
	let { whiteBackground = true } = $props();
</script>

<!-- TODO normal logo, this is temporary -->
<a
	class="flex flex-row items-center justify-center gap-0 text-2xl font-bold"
	href="/"
>
	<i
		class="{whiteBackground
			? 'text-violet-800'
			: 'text-white'} ri-book-ai-fill"
	></i>
	<span class="text-emerald-600">I</span>
	<span class={whiteBackground ? 'text-violet-800' : 'text-white'}>D</span>
	<span class={whiteBackground ? 'text-violet-800' : 'text-white'}>L</span>
	<span class="text-emerald-600">G</span>
	<span class={whiteBackground ? 'text-violet-800' : 'text-white'}>S</span>
</a>

<!--
<a href="/">
			<img
				src="??"
				alt="Logo of IDLGS"
			/>
		</a>
-->
