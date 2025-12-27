<script lang="ts">
	import Dropdown from './Dropdown.svelte';
	import { m } from '$lib/paraglide/messages';
	import { locales } from '$lib/paraglide/runtime';

	let { langValue = $bindable(''), css, cssLocal, cssSelector } = $props();
</script>

<Dropdown
	icon="global"
	downDirection={true}
	css='{css} font-medium'
	content={m.language()}
>
	<ul class="flex w-full grow flex-col rounded-lg {cssLocal} font-medium! **:font-medium!">
		{#each locales as locale, i (i)}
			<li
				class="{cssSelector} first:rounded-t-lg last:rounded-b-lg w-full"
			>
				<button
					onclick={() => {
						langValue = locale;
					}}
					class="flex w-full grow flex-col h-full hover:brightness-100!"
				>
					{m.languageName({}, { locale: locale })}
				</button>
			</li>
		{/each}
	</ul>
</Dropdown>
