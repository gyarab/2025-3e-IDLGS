<script lang="ts">
	import type { UserType } from '$lib/types';

	let {
		user,
	}: {
		user: UserType;
	} = $props();
</script>

<span>
	<span class="italic">{user.degree}</span>
	<span class="">{user.name}</span>
	<span class="font-bold">{user.middlename}</span>
	<span class="font-bold">{user.surname}</span>
</span>
