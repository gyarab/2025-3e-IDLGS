<script lang="ts">
	import { m } from "$lib/paraglide/messages";

	let {
		emoji,
		children
	}: {

	} = $props();
</script>

<button class="button-primary group" type="button">
	<i class="ri-{emoji}-line not-group-hover:hidden"></i>
	<i class="ri-{emoji}-fill group-hover:hidden"></i>
	{@render children?.()}
</button>
