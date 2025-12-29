<script lang="ts">
	import { m } from '$lib/paraglide/messages';

	let {
		step = $bindable(0),
		name, description, red, green, blue
	} = $props();
</script>

<div class="flex w-full grow flex-col gap-2"></div>
