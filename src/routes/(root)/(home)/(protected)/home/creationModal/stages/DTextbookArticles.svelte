<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import NextPrevious from '../components/NextPrevious.svelte';
	import ItemList from '../components/textbookarticles/ItemList.svelte';

	let {
		step = $bindable(0),
		articleNames = $bindable([]),
		chapterNames = $bindable([]),
		red,
		green,
		blue,
	}: {
		step: number;
		articleNames: string[][];
		chapterNames: string[];
		red: number;
		green: number;
		blue: number;
	} = $props();

	let selectedChapterName: string = $state('');
	let selectedArticleName: string = $state('');
</script>

<div class="flex w-full grow flex-col gap-2">
	<div class="flex w-full flex-row items-center gap-2">
		<h2>{m.textbookChaptersAndArticles()}</h2>
		<p class="opacity-80">
			{m.selectChapterOrArticleByClickingOnIt()}.
			{m.toAddOneEnterItsNameAndPressAddNew()}.
		</p>
	</div>
	<div
		class="
		flex w-full grow flex-row justify-center gap-4
		*:flex *:flex-col *:gap-2
	"
		style="color: rgb({red}, {green}, {blue});"
	>
		<div class="w-5/11 min-w-5/11 grow">
			<h3 class="text-white!">{m.chapters()}</h3>
			<!-- push also arrays for chapters' articles -->
			<ItemList
				bind:items={chapterNames}
				bind:selectedItem={selectedChapterName}
				additionalPush={() => {
					articleNames.push([]);
				}}
				additionalDelete={() => {
					articleNames.splice(
						chapterNames.indexOf(selectedChapterName),
						1,
					);
					selectedArticleName = '';
				}}
			>
				{m.noChapters()}
			</ItemList>
		</div>
		<div class="w-5/11 min-w-5/11 grow">
			<h3 class="text-white!">{m.articles()}</h3>
			{#if chapterNames.length > 0}
				{#if selectedChapterName.length > 0}
					<ItemList
						bind:items={
							articleNames[
								chapterNames.indexOf(selectedChapterName)
							]
						}
						bind:selectedItem={selectedArticleName}
					>
						{m.noArticles()}
					</ItemList>
				{:else}
					<div
						class="flex w-full grow flex-col items-center justify-center text-white opacity-80"
					>
						{m.noChapterSelected()}
					</div>
				{/if}
			{:else}
				<div
					class="flex w-full grow flex-col items-center justify-center text-white opacity-80"
				>
					{m.toCreateArticlesFirstAddAChapter()}
				</div>
			{/if}
		</div>
	</div>
	<NextPrevious
		currentStep={2}
		maxStep={4}
		onclickLast={() => {
			step = 2;
		}}
		onclickNext={() => {
			step = 5;
		}}
		disableConditionNext={false}
	/>
</div>
