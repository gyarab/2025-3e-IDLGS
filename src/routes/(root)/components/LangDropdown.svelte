<script lang="ts">
	import Dropdown from "./Dropdown.svelte";
	import { m } from "$lib/paraglide/messages";
	import { locales } from "$lib/paraglide/runtime";

	let {
		langValue = $bindable(""),
		css
	} = $props();
</script>

<Dropdown icon={'global'} downDirection={true} css={css} content={m.language()}>
	<ul class="bg-white flex flex-col grow w-full text-black rounded-lg">
		{#each locales as locale, i (i)}
			<li class="bg-white hover:brightness-80 first:rounded-t-lg last:rounded-b-lg">
				<button onclick={() => {
					langValue = locale;
				}} class="flex flex-col w-full grow">
					{m.languageName({}, { locale: locale })}
				</button>
			</li>
		{/each}
	</ul>
</Dropdown>
