<script lang="ts">
	import { fly } from 'svelte/transition';

	let {
		r = 100,
		g = 100,
		b = 100,
		delay = 0,
		children,
		cssOverride = '',
		cssParentOverride = '',
	} = $props();
</script>

<div
	class="
	flex h-fit w-full
	flex-col gap-2
	overflow-hidden rounded-lg border-2 shadow-xl hover:shadow-2xl
	{cssParentOverride}
	"
	style="background-color: rgb({r} {g} {b} / 30%); border-color: rgb({r} {g} {b} / 30%);"
	in:fly|global={{ x: 0, y: 100, opacity: 0, duration: 500, delay: delay }}
>
	<div
		class="gap-2 flex w-full grow flex-col rounded-lg {cssOverride.length > 0
			? cssOverride
			: 'p-5'} backdrop-blur"
	>
		{@render children?.()}
	</div>
</div>
