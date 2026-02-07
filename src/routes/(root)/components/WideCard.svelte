<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { fly } from 'svelte/transition';

	let {
		r = 100,
		g = 100,
		b = 100,
		delay = 0,
		children,
		cssOverride = '',
		cssParentOverride = '',
		cssAddition = '',
	}: {
		r?: number;
		g?: number;
		b?: number;
		delay?: number;
		children: Snippet;
		cssOverride?: string;
		cssParentOverride?: string;
		cssAddition?: string;
	} = $props();
</script>

<div
	class="
	z-5! flex h-fit
	w-full flex-col
	gap-2 border-2 shadow-xl hover:shadow-2xl
	{cssParentOverride} {cssAddition}
	max-xl:border-s-0! max-xl:border-e-0! max-xl:p-0! xl:rounded
		"
	style="background-color: rgb({r} {g} {b} / 50%); border-color: rgb({r} {g} {b});"
	in:fly|global={{
		x: 0,
		y: 100,
		opacity: 0,
		duration: 500,
		delay: delay,
	}}
>
	<div
		class="flex w-full grow flex-col gap-2 rounded {cssOverride.length > 0
			? cssOverride
			: 'p-5'} backdrop-blur-xl"
	>
		{@render children?.()}
	</div>
</div>
