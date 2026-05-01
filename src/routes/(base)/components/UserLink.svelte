<script lang="ts">
	import type { UserTypeInfo } from '$lib/types';

	let {
		user,
	}: {
		user: UserTypeInfo;
	} = $props();
</script>

<span>
	<span class="italic">{user.degree}</span>
	<span class="">{user.name}</span>
	<span class="font-bold">{user.middlename}</span>
	<span class="font-bold">{user.surname}</span>
</span>
