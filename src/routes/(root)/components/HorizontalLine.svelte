<script lang="ts">
	let {
		text,
		color
	}: {
		text: string;
		color: string;
	} = $props();
</script>

<div class="flex w-full flex-row items-center gap-2 p-0!">
	<div style="background-color: {color};" class="h-0.5 grow"></div>
	<div style="color: {color};" class="">{text}</div>
	<div style="background-color: {color};" class="h-0.5 grow"></div>
</div>
