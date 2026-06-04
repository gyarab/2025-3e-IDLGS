<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { TextbookType, UserType } from '$lib/types';
	import type { ResourceType } from 'cloudinary';

	let {
		darkMode,
		color,
		data,
	}: {
		darkMode: boolean;
		color: string;
		data: {
			user: UserType;
			textbook: TextbookType;
			resources: ResourceType[];
		};
	} = $props();
</script>

<svelte:head>
	<title>{data.textbook.title} | {m.resources()}</title>
</svelte:head>

<div
	class="mt-20 rounded-2xl p-4 shadow-xl {darkMode
		? 'bg-neutral-800 text-white'
		: 'bg-neutral-200 text-gray-800'}"
>
	<h1>{m.resources()}</h1>
	<!-- <p>{m.textbookresourcesdescription()}</p> -->

	{#if data.resources && data.resources.length > 0}
		<ul class="mt-4 flex flex-col gap-3">
			{#each data.resources as r, i (r.id ?? i)}
				<li
					class="rounded p-3 {darkMode
						? 'bg-neutral-700/20'
						: 'bg-white'}"
				>
					<div class="flex items-center gap-2">
						<div class="grow">
							<div class="font-bold">{r.title}</div>
							{#if r.url}
								<a
									class="text-sm text-blue-500"
									href={r.url}
									target="_blank"
									rel="noreferrer">{r.url}</a
								>
							{/if}
							{#if r.description}
								<div class="text-sm opacity-80">
									{r.description}
								</div>
							{/if}
						</div>
						<div class="flex gap-2">
							<a
								href={r.url}
								target="_blank"
								rel="noreferrer"
							>
								<Button
									text=""
									emoji="open"
									type="button"
									css="buttonPrimary"
								/>
							</a>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="mt-4 italic opacity-70">{m.noResourcesSoFar()}</div>
	{/if}
</div>
