<script lang="ts">
	let {
		darkMode,
		orientation,
	}: {
		darkMode: boolean;
		orientation: 'vertical' | 'h sm:v';
	} = $props();

	const horizontalLine = 'h-0.5 w-full';
	const verticalLine = 'h-full w-0.5';
	let line = $derived(() => {
		if (orientation === 'vertical') return verticalLine;
		if (orientation === 'h sm:v')
			return `${horizontalLine} sm:${verticalLine}`;
	});
</script>

<div class="mx-1 {line} {darkMode ? 'bg-neutral-200' : 'bg-neutral-800'}"></div>
