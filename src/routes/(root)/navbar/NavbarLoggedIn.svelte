<script lang="ts">
	import { goto } from '$app/navigation';
	import { m } from '$lib/paraglide/messages';
	import { getLocale, setLocale, type Locale } from '$lib/paraglide/runtime';
	import Button from '../components/Button.svelte';
	import LangDropdown from '../components/LangDropdown.svelte';

	let value: Locale = $state(getLocale());

	$effect(() => {
		setLocale(value);
	});
</script>

<div class="flex h-[10lvh] w-full print:hidden"></div>
<div
	class="print:hidden fixed top-0 left-0 z-50! flex h-[10lvh] w-full flex-col items-center justify-center bg-violet-700 max-lg:hidden"
>
	<div
		class="fixed z-40! flex w-8/10 flex-row items-center gap-10 text-white!"
	>
		<a href="/home/">
			<img
				src="??"
				alt="Logo of IDLGS"
			/>
		</a>
		<LangDropdown
			css="button-transparent"
			bind:langValue={value}
		/>

		<div class="grow"></div>

		<Button
			emoji="logout-box"
			btn="button-green"
			onclick={() => {
				goto('/logout', {
					invalidateAll: true,
					replaceState: true,
					keepFocus: false,
					noScroll: false,
				});
			}}
		>
			{m.logout()}
		</Button>
	</div>
</div>
