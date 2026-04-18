<script lang="ts">
	let {
		emoji,
		css,
		style,
	}: {
		emoji: string,
		css?: string,
		style?: string,
	} = $props();
</script>

<i {style} class="{css} ri-{emoji}-line group-hover:hidden"></i>
<i {style} class="{css} ri-{emoji}-fill not-group-hover:hidden"></i>