<script lang="ts">
	import { darkenHex } from '$lib';
	import type { TextbookType, UserType } from '$lib/types';
	import { m } from '$lib/paraglide/messages';

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
			user: UserType;
			textbooks: TextbookType[];
		};
	} = $props();
</script>

<div></div>
