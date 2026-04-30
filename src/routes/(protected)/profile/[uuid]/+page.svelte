<script lang="ts">
	import type { UserType } from '$lib/types';

	let {
		data,
	}: {
		data: {
			user: UserType | null; // current logged in user
			thisUser: UserType; // user of this page
		};
	} = $props();
</script>
