<script lang="ts">
	let {
		name,
		value,
	}: {
		name: string;
		value: unknown;
	} = $props();

	let element: HTMLInputElement;
	$effect(() => {
		if(value) {
			element.dispatchEvent(new Event('change'));
		}
	});
</script>

<input bind:this={element} type="hidden" name="{name}" value="{value}" />