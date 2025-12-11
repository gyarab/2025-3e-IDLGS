<script lang="ts">
	let {
		text,
		color,
	}: {
		text: string,
		color: string,
	} = $props();
</script>

<div class="flex flex-row w-full gap-2 p-0! items-center">
	<div style="background-color: {color};" class="h-0.5 grow"></div>
	<div style="color: {color};" class="">{text}</div>
	<div style="background-color: {color};" class="h-0.5 grow"></div>
</div>