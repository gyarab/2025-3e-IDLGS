<script lang="ts">
	import type { UserType } from '$lib/types';
	import { getLocale, setLocale, type Locale } from '$lib/paraglide/runtime';
	import LangDropdown from '../LangDropdown.svelte';
	import { m } from '$lib/paraglide/messages';
	import HoverEmoji from '../HoverEmoji.svelte';

	let value: Locale = $state(getLocale());

	$effect(() => {
		setLocale(value);
	});

	let {
		user,
	}: {
		user: UserType;
	} = $props();
</script>

<nav class="fixed bottom-0 left-0 z-50! flex xl:hidden"></nav>
