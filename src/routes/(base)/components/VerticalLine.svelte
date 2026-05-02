<script lang="ts">
	let {
		darkMode,
	}: {
		darkMode: boolean;
	} = $props();
</script>

<div
	class="ms-1 me-1 h-full w-0.5 {darkMode
		? 'bg-neutral-200'
		: 'bg-neutral-800'}"
></div>
