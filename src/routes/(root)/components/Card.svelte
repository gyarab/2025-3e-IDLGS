<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import { fly } from 'svelte/transition';

	let {
		children,
		r = 100,
		g = 100,
		b = 100,
		delay = 0,
		perspective,
		onclick = () => {},
		forceSquare = true,
		hover = false,
		css = '',
		padding = 'p-2',
		disable = false,
	}: {
		children: Snippet;
		r?: number;
		g?: number;
		b?: number;
		delay?: number;
		perspective?: boolean;
		onclick?: () => void;
		forceSquare?: boolean;
		hover?: boolean;
		css?: string;
		padding?: string;
		disable?: boolean;
	} = $props();

	let rect: DOMRect | undefined = $state(undefined);
	let value = $state(crypto.randomUUID());

	let xPercentage = $state(0);
	let yPercentage = $state(0);
	let xRotation = $state(0);
	let yRotation = $state(0);

	const mouseEnterEventHandler = (e: MouseEvent) => {
		rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
	};
	const mouseMoveEventHandler = (e: MouseEvent) => {
		if (!rect) return;

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		xPercentage = x / rect.width;
		yPercentage = y / rect.height;
		xRotation = (0.5 - xPercentage) * 50;
		yRotation = (yPercentage - 0.5) * 50;
	};
	const mouseLeaveEventHandler = () => {
		rect = undefined;
		xPercentage = 0;
		yPercentage = 0;
		xRotation = 0;
		yRotation = 0;
	};

	onMount(() => {
		if (!browser) return;
		let el = document.getElementById(value);
		if (!el) return;
		el.addEventListener('mousemove', mouseMoveEventHandler);
		el.addEventListener('mouseleave', mouseLeaveEventHandler);
		el.addEventListener('mouseenter', mouseEnterEventHandler);
	});
	onDestroy(() => {
		if (!browser) return;
		let el = document.getElementById(value);
		if (!el) return;
		el.removeEventListener('mousemove', mouseMoveEventHandler);
		el.removeEventListener('mouseleave', mouseLeaveEventHandler);
		el.removeEventListener('mouseenter', mouseEnterEventHandler);
	});
</script>

<div
	class="flex flex-col gap-2 {css}"
	id={value}
>
	<div
		class="
	flex {forceSquare ? 'aspect-square!' : 'grow'} static
	w-full flex-col gap-2
	border-2 shadow-xl perspective-[1600px] hover:shadow-2xl
	{hover ? 'hover:border-neutral-300!' : ''}
	{css}
	max-xl:border-s-0! max-xl:border-e-0! max-xl:p-0! xl:rounded
	"
		style="background-color: rgb({r} {g} {b} / 50%); border-color: rgb({r} {g} {b}); {perspective
			? `transform: rotateX(${yRotation}deg) rotateY(${xRotation}deg) translateZ(0);`
			: ''}"
		in:fly|global={{
			x: 0,
			y: 100,
			opacity: 0,
			duration: 500,
			delay: delay,
		}}
	>
		<button
			disabled={disable}
			class="
		disable:brightness-100! static flex h-full max-h-full min-h-full w-full max-w-full
		min-w-full grow flex-col gap-2 rounded {padding} backdrop-blur-xl hover:brightness-100!
		{hover ? 'hover:backdrop-brightness-120' : ''}
		"
			onclick={() => {
				onclick();
			}}
		>
			{@render children?.()}
		</button>
	</div>
</div>
