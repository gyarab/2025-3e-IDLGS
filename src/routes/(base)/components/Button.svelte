<script lang="ts">
	import HoverEmoji from "./HoverEmoji.svelte";

	let {
		emoji,
		text,
		disabled = false,
		type = "button",
		label,
		id = "",
	}: {
		emoji: string
		text: string
		disabled?: boolean
		label?: string,
		type: "button" | "submit" | "reset",
		id?: string
	} = $props();

</script>

<button
	{type}
	{id}
	{disabled}
	aria-label={label}
>
	<HoverEmoji {emoji} />
	{text}
</button>