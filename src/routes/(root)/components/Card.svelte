<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';

	let { text, color = 'neutral-500' } = $props();

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
		xRotation = (xPercentage - 0.5) * 50;
		yRotation = (0.5 - yPercentage) * 50;
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
		let el = document.getElementById(value) as HTMLElement;
		el.addEventListener('mousemove', mouseMoveEventHandler);
		el.addEventListener('mouseleave', mouseLeaveEventHandler);
		el.addEventListener('mouseenter', mouseEnterEventHandler);
	});
	onDestroy(() => {
		if (!browser) return;
		let el = document.getElementById(value) as HTMLElement;
		el.removeEventListener('mousemove', mouseMoveEventHandler);
		el.removeEventListener('mouseleave', mouseLeaveEventHandler);
		el.removeEventListener('mouseenter', mouseEnterEventHandler);
	});
</script>

<div
	id={value}
	class="
	flex aspect-square flex-col gap-2
	rounded-lg border-2 border-{color} bg-{color}/30
	overflow-hidden perspective-[1600px]
	"
	style="transform: rotateX({yRotation}deg) rotateY({xRotation}deg) translateZ(0);"
>
	<div class="flex w-full grow flex-col rounded-lg p-2 backdrop-blur-2xl">
		{text}
	</div>
</div>
