<script lang="ts">
	let {
		darkMode,
	}: {
		darkMode: boolean;
	} = $props();
</script>

<div class="w-0.5 h-full ms-1 me-1 {darkMode ? 'bg-neutral-200' : 'bg-neutral-800'}"></div>