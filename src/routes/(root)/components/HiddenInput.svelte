<script lang="ts">
	let {
		name,
		value,
		ignoreChangeEvents = false,
	}: {
		name: string;
		value: unknown;
		ignoreChangeEvents?: boolean;
	} = $props();

	let element: HTMLInputElement;
	$effect(() => {
		if (value) {
			element.dispatchEvent(new Event('change'));
		}
	});
</script>

<input
	bind:this={element}
	type="hidden"
	{name}
	{value}
	class={ignoreChangeEvents ? 'ignoreChangeEvents' : ''}
/>
