<script lang="ts">
	import Dropdown from './Dropdown.svelte';
	import { m } from '$lib/paraglide/messages';
	import { getLocale, locales } from '$lib/paraglide/runtime';

	let { langValue = $bindable(''), css, cssLocal, cssSelector } = $props();
</script>

<Dropdown
	icon=""
	downDirection={true}
	css="{css} font-medium ps-0! pe-0!"
	content={m.languageName({}, { locale: getLocale() })}
>
	<ul
		class="flex w-full grow flex-col rounded {cssLocal} font-medium! **:font-medium!"
	>
		{#each locales as locale (locale)}
			<li
				class="{cssSelector} w-full first:rounded-t-lg last:rounded-b-lg"
			>
				<button
					onclick={() => {
						langValue = locale;
					}}
					class="flex h-full w-full grow flex-col hover:brightness-100!"
				>
					{m.languageName({}, { locale: locale })}
				</button>
			</li>
		{/each}
	</ul>
</Dropdown>
