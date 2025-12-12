<script lang="ts">
	import Dropdown from './Dropdown.svelte';
	import { m } from '$lib/paraglide/messages';
	import { locales } from '$lib/paraglide/runtime';

	let { langValue = $bindable(''), css } = $props();
</script>

<Dropdown icon={'global'} downDirection={true} {css} content={m.language()}>
	<ul class="flex w-full grow flex-col rounded-lg bg-white text-black">
		{#each locales as locale, i (i)}
			<li class="bg-white first:rounded-t-lg last:rounded-b-lg hover:brightness-80">
				<button
					onclick={() => {
						langValue = locale;
					}}
					class="flex w-full grow flex-col"
				>
					{m.languageName({}, { locale: locale })}
				</button>
			</li>
		{/each}
	</ul>
</Dropdown>
