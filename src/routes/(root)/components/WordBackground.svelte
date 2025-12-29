<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { locales } from '$lib/paraglide/runtime';

	let {
		messages = [
			m.education,
			m.learning,
			m.development,
			m.motivation,
			m.technology,
		],
	} = $props();
</script>

<div
	class="absolute top-0 left-0 h-full w-full bg-linear-to-tr from-emerald-500 to-violet-700"
>
	<div
		class="absolute top-0 left-0 z-1 flex h-full w-full flex-row flex-wrap items-center justify-center gap-2 overflow-hidden text-sm font-bold text-white opacity-10"
	>
		{#each { length: 700 } as a, i (i)}
			{@const selectedLocale = i % locales.length}
			{@const selectedMessage = Math.trunc(
				Math.random() * messages.length,
			)}
			<span>
				{messages[selectedMessage](
					{},
					{ locale: locales[selectedLocale] },
				)}
			</span>
		{/each}
	</div>
</div>
