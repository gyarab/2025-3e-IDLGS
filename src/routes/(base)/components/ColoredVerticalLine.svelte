<script lang="ts">
	let {
		color,
	}: {
		color: string;
	} = $props();
</script>

<div
	class="ms-1 me-1 h-full w-0.5"
	style="background-color: {color};"
></div>
