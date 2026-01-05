<script lang="ts">
	import type { UserType } from "$lib/types";

	let {
		user
	}: {
		user: UserType
	} = $props();
</script>

<div class="flex flex-row w-full gap-2 text-black!">
	<!-- TODO -->
	{JSON.stringify(user)}
</div>