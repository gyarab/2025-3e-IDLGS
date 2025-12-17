<script lang="ts">
	import { fly } from 'svelte/transition';

	let { r = 115, g = 115, b = 115, delay = 0, children, cssOverride = "", cssParentOverride = "" } = $props();
</script>

<div
	class="
	flex h-fit w-full
	flex-col gap-2
	overflow-hidden rounded-lg border-2 shadow
	{cssParentOverride}
	"
	style="background-color: rgb({r} {g} {b} / 30%); border-color: rgb({r} {g} {b} / 30%);"
	in:fly|global={{ x: 0, y: 100, opacity: 0, duration: 500, delay: delay }}
>
	<div class="flex w-full flex-col rounded-lg grow {cssOverride.length > 0 ? cssOverride : "p-5"} backdrop-blur-2xl">
		{@render children?.()}
	</div>
</div>
