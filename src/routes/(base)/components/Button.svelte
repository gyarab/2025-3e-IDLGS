<script lang="ts">
	import HoverEmoji from "./HoverEmoji.svelte";

	let {
		emoji,
	}: {
		emoji: string
	} = $props();

</script>

<button>
	<HoverEmoji {emoji} />
</button>