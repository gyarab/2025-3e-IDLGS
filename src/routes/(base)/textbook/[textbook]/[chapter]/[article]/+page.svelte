<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Sidebar from './ui/Sidebar.svelte';
	import CommandPalette from './ui/CommandPalette.svelte';
	import Background from './ui/components/Background.svelte';
	import { browser } from '$app/environment';
	import ReadBox from './ui/ReadBox.svelte';
	import EditBox from './ui/EditBox.svelte';
	import FeedbackForm from './ui/FeedbackForm.svelte';
	import SideBox from './ui/SideBox.svelte';
	import InteractiveExerciseBox from './ui/InteractiveExerciseBox.svelte';
	import ArticleNavbox from './ui/ArticleNavbox.svelte';
	import type { ArticleType, TextbookType, ChapterType } from '$lib/types';
	import { renderMarkdown } from '$lib/markdown';

	let {
		data,
	}: {
		data: {
			color: string;
			darkMode: boolean;
			navbarOpen: boolean;
			sidebarOpen: boolean;
			textbook: TextbookType;
			chapter: ChapterType;
			article: ArticleType;
		};
	} = $props();

	let darkMode = $derived(data.darkMode);
	let color = $derived(data.color);

	let commandPaletteOpen = $state(false);
	let sidebarOpen = $derived(data.sidebarOpen);
	let focusMode = $state(false);

	let windowScroll = $state(0);
	const updateWindowScroll = () => {
		windowScroll = window.scrollY;
	};

	let documentHeight = $state(1);
	const updateDocumentHeight = () => {
		documentHeight = document.documentElement.scrollHeight;
	};

	let percentArticleRead = $derived.by(() => {
		if (browser) {
			return (windowScroll / (documentHeight - window.innerHeight)) * 100;
		} else return 0;
	});

	//TODO finish, make editable (remappable)
	const keyboardHandler = (e: KeyboardEvent) => {
		//Ctrl+K or Cmd+K to open command palette
		if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			commandPaletteOpen = !commandPaletteOpen;
		}
		//F for focus mode (hide navbar and sidebar)
		else if (e.key === 'f' || e.key === 'F') {
			e.preventDefault();
			focusMode = !focusMode;

			sidebarOpen = focusMode;
			commandPaletteOpen = focusMode;
		}
		//go to top with u
		else if (e.key === 'u' || e.key === 'U') {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
		}
	};

	let renderedText = $state('');

	onMount(async () => {
		if (browser) {
			addEventListener('scroll', updateWindowScroll);
			addEventListener('resize', updateDocumentHeight);
			addEventListener('keydown', keyboardHandler);

			updateWindowScroll();
			updateDocumentHeight();

			renderedText = await renderMarkdown(data.article.text);
		}
	});
	onDestroy(() => {
		if (browser) {
			removeEventListener('scroll', updateWindowScroll);
			removeEventListener('resize', updateDocumentHeight);
			removeEventListener('keydown', keyboardHandler);
		}
	});
</script>

<svelte:head>
	<title>
		{data.article.title} | {data.chapter.title} | {data.textbook.title} | IDLGS
	</title>
</svelte:head>

<Sidebar
	bind:darkMode
	accentColor={data.color}
	bind:commandPaletteOpen
	bind:open={sidebarOpen}
/>

<div
	class="relative mt-4 mb-4 flex min-h-screen w-screen grow flex-col items-center gap-4 overflow-x-hidden overflow-y-scroll **:z-5"
>
	{#key percentArticleRead}
		<Background
			accentColor={data.color}
			percentRead={percentArticleRead}
			{darkMode}
		/>
	{/key}

	<EditBox
		{darkMode}
		color={data.color}
		isEditor={true}
		lastEditedDate={new Date()}
		lastEditor={{
			name: 'Ali',
			surname: 'Yunussov',
			middlename: 'programator!',
			degree: 'dr inż.',
			institution: 'AGH',
			profilePicture: '',
			uuid: '123e4567-e89b-12d3-a456-426614174000',
		}}
	/>

	<ReadBox
		darkMode={data.darkMode}
	>
		{@html renderedText}
	</ReadBox>

	<!-- TODO-->
	<SideBox />

	<InteractiveExerciseBox
		{darkMode}
		color={data.color}
	/>

	<FeedbackForm
		{darkMode}
		color={data.color}
	/>

	<ArticleNavbox
		{darkMode}
		color={data.color}
	/>

	<CommandPalette
		bind:open={commandPaletteOpen}
		{darkMode}
		{color}
	/>
</div>
