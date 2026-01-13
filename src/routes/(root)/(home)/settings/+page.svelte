<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Desktop from './Desktop.svelte';
	import Mobile from './Mobile.svelte';
	import type { UserType } from '$lib/types';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import UnsavedChangesBox from '../../components/UnsavedChangesBox.svelte';

	let {
		data,
	}: {
		data: {
			user: UserType;
		};
	} = $props();

	let showUnsavedChanges = $state(false);

	const inputElementChangeCallback = () => {
		showUnsavedChanges = true;
	};
	const formSubmitChangeCallback = () => {
		showUnsavedChanges = false;
	};

	onMount(() => {
		if (!browser) return;
		document.querySelectorAll('input, select, textarea').forEach((el) => {
			el.addEventListener('change', inputElementChangeCallback);
		});
		document.querySelectorAll('form').forEach((el) => {
			el.addEventListener('submit', formSubmitChangeCallback);
		});
	});
	onDestroy(() => {
		if (!browser) return;
		document.querySelectorAll('input, select, textarea').forEach((el) => {
			el.removeEventListener('change', inputElementChangeCallback);
		});
		document.querySelectorAll('form').forEach((el) => {
			el.removeEventListener('submit', formSubmitChangeCallback);
		});
	});
</script>

<svelte:head>
	<title>
		{m.settings()} - {m.textbookNameShort()}
	</title>
</svelte:head>

<Desktop {data} />
<Mobile {data} />

<UnsavedChangesBox show={showUnsavedChanges} />
