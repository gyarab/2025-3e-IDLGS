<script>
	let {
		active = false,
		onclick,
		accentColor = '#3b82f6',
		icon,
		children,
	} = $props();
</script>

<button
	{onclick}
	class="tab-btn {active ? 'active' : ''}"
	style="--accent: {accentColor}"
>
	{#if icon}
		<i class="{icon} ml-1"></i>
	{/if}
	{@render children()}
</button>
