<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import CreateArea from '../../components/creation/CreateArea.svelte';
	import { resolve } from '$app/paths';
	import BasicInformation from './ui/BasicInformation.svelte';
	import Structure from './ui/Structure.svelte';
	import Authors from './ui/Authors.svelte';
	import Resources from './ui/Resources.svelte';
	import Review from './ui/Review.svelte';
	import PageControl from '../../components/PageControl.svelte';
	import type {
		ArticleTypeRaw,
		ChapterTypeRaw,
		UserTypeInfo,
	} from '$lib/types';
	import Form from '$src/routes/(base)/components/Form.svelte';
	import LoadingAnimationHandler from '../../components/loading/LoadingAnimationHandler.svelte';
	import { goto } from '$app/navigation';

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
			user: UserTypeInfo;
		};
	} = $props();

	let stage: number = $state(0);
	let name: string = $state('');
	let description: string = $state('');
	let textbookColor: string = $derived(data.color);
	let educationLevel: string = $state('');
	let chapters: ChapterTypeRaw[] = $state([]);
	let articles: ArticleTypeRaw[][] = $state([]);
	let authorUuids: string[] = $state([]);
</script>

<svelte:head>
	<title>
		{m.createTextbook()} | {m.idlgs()}
	</title>
</svelte:head>

<CreateArea
	color={textbookColor}
	darkMode={data.darkMode}
	texts={[
		m.basicInformation(),
		m.textbookStructure(),
		m.resources(),
		m.authors(),
		m.review(),
	]}
	title={m.newTextbook()}
	emoji={'ri-health-book-line'}
	helpLink={resolve('/help/textbook/creation')}
	backLink={resolve('/(base)/textbook')}
	bind:stage
>
	<div class="flex w-full grow flex-col overflow-x-hidden overflow-y-scroll">
		{#if stage == 0}
			<BasicInformation
				darkMode={data.darkMode}
				bind:name
				bind:description
				bind:color={textbookColor}
				bind:education={educationLevel}
			/>
		{:else if stage == 1}
			<Structure
				darkMode={data.darkMode}
				color={textbookColor}
				bind:chapters
				bind:articles
			/>
		{:else if stage == 2}
			<Resources
				darkMode={data.darkMode}
				color={textbookColor}
			/>
		{:else if stage == 3}
			<Authors
				darkMode={data.darkMode}
				color={textbookColor}
				bind:authors={authorUuids}
				user={data.user}
			/>
		{:else if stage == 4}
			<Review
				darkMode={data.darkMode}
				color={textbookColor}
				{name}
				{description}
				{educationLevel}
				{chapters}
				{articles}
				authors={authorUuids}
			/>
		{:else if stage == 5}
			<LoadingAnimationHandler color={textbookColor} />
		{/if}
	</div>
	<Form
		target="?/makeTextbook"
		darkMode={data.darkMode}
		css="invisibleForm -mt-2"
		start={async () => {
			stage = 5;
		}}
		success={async () => {
			goto(resolve('/(base)/textbook'));
		}}
		failure={async () => {
			stage = 4;
			//TODO popup message @AY-GA
		}}
		color={data.color}
	>
		<input
			type="hidden"
			name="color"
			value={textbookColor}
			required
		/>
		<input
			type="hidden"
			name="name"
			value={name}
			required
		/>
		<input
			type="hidden"
			name="description"
			value={description}
			required
		/>
		<input
			type="hidden"
			name="educationLevel"
			value={educationLevel}
			required
		/>
		<input
			type="hidden"
			name="chapters"
			value={JSON.stringify(chapters)}
			required
		/>
		<input
			type="hidden"
			name="articles"
			value={JSON.stringify(articles)}
			required
		/>
		<input
			type="hidden"
			name="authors"
			value={JSON.stringify(authorUuids)}
			required
		/>
		<PageControl
			bind:stage
			darkMode={data.darkMode}
			color={textbookColor}
			disableNext={(stage == 0 &&
				(!name || !description || !educationLevel)) ||
				(stage == 1 &&
					(chapters.length == 0 ||
						articles
							.map((c) => c.length)
							.every((len) => len === 0))) ||
				false}
			disablePrev={false}
			createText={m.createTextbook()}
			nextButtonCreate={stage >= 4}
		/>
	</Form>
</CreateArea>
