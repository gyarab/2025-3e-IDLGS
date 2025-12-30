<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';

	let {
		x = $bindable(0),
		y = $bindable(0),
		width = 100,
		height = 100,
		snappingFunction = () => {},
		overrideDragFunction = undefined,
		element,
		condition = true,
		isDragging = $bindable(false),
	}: {
		x: number;
		y: number;
		width?: number;
		height?: number;
		snappingFunction?: () => void;
		overrideDragFunction?: (dx: number, dy: number) => void;
		element: HTMLElement;
		condition?: boolean;
		isDragging?: boolean;
	} = $props();

	let dragBeginX: number = $state(0);
	let dragBeginY: number = $state(0);

	const dragStartHandler = (e: MouseEvent) => {
		e.stopPropagation();
		isDragging = true;
		dragBeginX = e.pageX;
		dragBeginY = e.pageY;
	};

	const dragEndHandler = (e: MouseEvent) => {
		e.stopPropagation();

		isDragging = false;
	};

	const dragHandler = (e: MouseEvent) => {
		e.stopPropagation();

		if (!isDragging || !condition) return;

		let dx = ((e.pageX - dragBeginX) / width) * 100;
		let dy = ((e.pageY - dragBeginY) / height) * 100;

		if (overrideDragFunction != undefined) {
			overrideDragFunction(dx, dy);
		} else {
			x += dx;
			y += dy;
		}

		snappingFunction();

		dragBeginX = e.pageX;
		dragBeginY = e.pageY;

		return false;
	};

	onMount(() => {
		if (!browser || !element) return;

		element.addEventListener('mousedown', dragStartHandler);
		addEventListener('mousemove', dragHandler);
		addEventListener('mouseup', dragEndHandler);
	});
	onDestroy(() => {
		if (!browser || !element) return;

		element.removeEventListener('mousedown', dragStartHandler);
		removeEventListener('mousemove', dragHandler);
		removeEventListener('mouseup', dragEndHandler);
	});
</script>
