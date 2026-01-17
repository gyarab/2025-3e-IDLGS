<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { UserType } from '$lib/types';

	let {
		data,
	}: {
		data: {
			user: UserType;
		};
	} = $props();
</script>

<div class="flex w-full grow flex-col xl:hidden"></div>
