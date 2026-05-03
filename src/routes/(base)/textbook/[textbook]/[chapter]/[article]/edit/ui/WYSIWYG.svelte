<script lang="ts">
	let {
		darkMode,
		color,
		articleText = $bindable(''),
	}: {
		darkMode: boolean;
		color: string;
		articleText: string;
	} = $props();
</script>

<div class="flex w-full flex-col gap-4"></div>
