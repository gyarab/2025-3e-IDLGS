<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { fly } from 'svelte/transition';
	import type { ChapterTypeRaw, ArticleTypeRaw } from '$lib/types';
	import { makeURLFromImage } from '$lib';
	import { onDestroy } from 'svelte';

	let {
		darkMode,
		color,
		name,
		description,
		educationLevel,
		chapters,
		articles,
		authors,
		thumbnail,
	}: {
		darkMode: boolean;
		color: string;
		name: string;
		description: string;
		educationLevel: string;
		chapters: ChapterTypeRaw[];
		articles: ArticleTypeRaw[][];
		authors: string[];
		thumbnail: File;
	} = $props();

	let functionIsced = (level: string) => {
		switch (level) {
			case '0':
				return m.isced0();
			case '1':
				return m.isced1();
			case '2':
				return m.isced2();
			case '3':
				return m.isced3();
			case '4':
				return m.isced4();
			case '5':
				return m.isced5();
			case '6':
				return m.isced6();
			case '7':
				return m.isced7();
			case '8':
				return m.isced8();
			default:
				return '';
		}
	};

	let imagePreview: string = $derived(makeURLFromImage(thumbnail));
	onDestroy(() => {
		URL.revokeObjectURL(imagePreview);
	});
</script>

<div class="flex w-full grow flex-col gap-2">
	<div
		class="mb-2 flex w-full flex-row items-center gap-2"
		in:fly={{ x: 1000, y: 0, duration: 300, delay: 100, opacity: 0 }}
	>
		<h2 class="text-2xl font-bold">{m.reviewInformation()}</h2>
		<p>{m.reviewInformationDescription()}</p>
	</div>
	<div class="flex w-full grow flex-col gap-2">
		<div class="flex w-full flex-row gap-0">
			<span class="font-bold">{m.textbookName()}:</span>
			<div
				class="grow border-b border-dashed {darkMode
					? 'border-white'
					: 'border-black'}"
			></div>
			{name}
		</div>

		<div class="flex w-full flex-row gap-0">
			<span class="font-bold">{m.textbookDescription()}:</span>
			<div
				class="grow border-b border-dashed {darkMode
					? 'border-white'
					: 'border-black'}"
			></div>
			{description}
		</div>

		<div class="flex w-full flex-row gap-0">
			<span class="font-bold">{m.educationLevel()}:</span>
			<div
				class="grow border-b border-dashed {darkMode
					? 'border-white'
					: 'border-black'}"
			></div>
			{functionIsced(educationLevel)} (ISCED {educationLevel})
		</div>

		<div class="flex w-full flex-col items-end gap-0">
			<div class="flex w-full flex-row gap-0">
				<span class="font-bold">{m.chapterAmount()}:</span>
				<div
					class="grow border-b border-dashed {darkMode
						? 'border-white'
						: 'border-black'}"
				></div>
				{chapters.length}
			</div>
			<!-- list of chapters -->
			<div class="flex w-9/10 flex-row gap-2 italic">
				{#each chapters as chapter, i (i)}
					{chapter.title}
					{#if i < chapters.length - 1}
						,
					{/if}
				{/each}
			</div>
		</div>

		<div class="flex w-full flex-col items-end gap-0">
			<div class="flex w-full flex-row gap-0">
				<span class="font-bold">{m.articleAmount()}:</span>
				<div
					class="grow border-b border-dashed {darkMode
						? 'border-white'
						: 'border-black'}"
				></div>
				{articles.reduce((acc, curr) => acc + curr.length, 0)}
			</div>
			<!-- list of articles -->
			<div class="flex w-9/10 flex-row gap-2 italic">
				{#each articles as articleGroup}
					{#each articleGroup as article}
						{article.title}
						{#if !(articleGroup[articleGroup.length - 1] === article && articles[articles.length - 1] === articleGroup)}
							,
						{/if}
					{/each}
				{/each}
			</div>
		</div>

		<!-- authors -->
		<div class="flex w-full flex-row gap-0">
			<span class="font-bold">{m.authors()}:</span>
			<div
				class="grow border-b border-dashed {darkMode
					? 'border-white'
					: 'border-black'}"
			></div>
			{authors.length + 1}
		</div>

		<!-- thumbnail -->
		<div class="flex w-full flex-col gap-0">
			<div class="flex w-full flex-row gap-0">
				<span class="font-bold">{m.thumbnail()}:</span>
				<div
					class="grow border-b border-dashed {darkMode
						? 'border-white'
						: 'border-black'}"
				></div>
			</div>
			<div class="flex w-full flex-row">
				<div class="grow"></div>
				{#if thumbnail}
					<img
						src={imagePreview}
						alt={m.thumbnailPreview()}
						class="aspect-2/1 w-[30svh] rounded-lg object-cover"
					/>
				{:else}
					<p>{m.noThumbnail()}</p>
				{/if}
			</div>
		</div>
	</div>
</div>
