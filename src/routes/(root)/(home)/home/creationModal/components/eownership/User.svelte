<script lang="ts">
	import type { UserType } from '$lib/types';

	let {
		user,
	}: {
		user: UserType;
	} = $props();
</script>

<div class="flex w-full flex-row gap-2 text-black!">
	<!-- TODO -->
	{JSON.stringify(user)}
</div>
