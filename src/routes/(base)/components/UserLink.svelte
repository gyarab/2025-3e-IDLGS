<script lang="ts">
	import { resolve } from '$app/paths';
	import type { UserTypeInfo } from '$lib/types';

	let {
		user,
		nolink = false,
	}: {
		user: UserTypeInfo;
		nolink?: boolean;
	} = $props();
</script>

{#snippet name()}
	<span class="italic">{user.degree}</span>
	<span class="">{user.name}</span>
	<span class="font-bold">{user.middlename}</span>
	<span class="font-bold">{user.surname}</span>
{/snippet}

{#if !nolink}
	<a
		href={resolve(`/(protected)/profile/[uuid]`, {
			uuid: user.uuid,
		})}
		target="_blank"
	>
		{@render name()}
	</a>
{:else}
	<span>
		{@render name()}
	</span>
{/if}
