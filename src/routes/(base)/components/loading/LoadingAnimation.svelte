<script lang="ts">
	let {
		color,
	}: {
		color: string;
	} = $props();
</script>

<div class="h-16 w-16 animate-pulse">
	<svg class="w-16 h-16" viewBox="0 0 100 100">
		<circle
			class="animate-variable-spin"
			style="stroke: {color};"
			cx="50"
			cy="50"
			r="40"
			stroke-width="12"
			fill="none"
			stroke-dasharray="160 250"
			stroke-linecap="round"	
		/>
	</svg>
</div>
