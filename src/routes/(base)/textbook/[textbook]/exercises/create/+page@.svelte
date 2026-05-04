<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import TypeSelection from './ui/TypeSelection.svelte';
	import BasicInformation from './ui/BasicInformation.svelte';
	import PageControl from '../../../../components/PageControl.svelte';
	import CRSEditor from './editor/CRSEditor.svelte';
	import CRWEditor from './editor/CRWEditor.svelte';
	import DEFEditor from './editor/DEFEditor.svelte';
	import GRPEditor from './editor/GRPEditor.svelte';
	import GEOEditor from './editor/GEOEditor.svelte';
	import EXTEditor from './editor/EXTEditor.svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import CreateArea from '$src/routes/(base)/components/creation/CreateArea.svelte';
	import Review from './ui/Review.svelte';
	import Form from '$src/routes/(base)/components/Form.svelte';
	import { goto } from '$app/navigation';
	import type { ArticleTypeRawUuid } from '$lib/types';
	import { addToast } from '$lib/toast';
	import DFTEditor from './editor/DFTEditor.svelte';

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
			articles: ArticleTypeRawUuid[];
		};
	} = $props();

	let stage: number = $state(0);

	//exercise temp data
	let type: string = $state('');
	let name: string = $state('');
	let description: string = $state('');
	let thumbnail: File[] = $state([]);

	let backgroundColorR: number = $state(255);
	let backgroundColorG: number = $state(255);
	let backgroundColorB: number = $state(255);
	let foregroundColorR: number = $state(0);
	let foregroundColorG: number = $state(0);
	let foregroundColorB: number = $state(0);

	//crossword (crs/crw) specific data
	let crWords: string[] = $state([]);
	let crClues: string[] = $state([]);
	let crDescriptions: string[] = $state([]);
	let crSolution: string = $state('');

	//crs specific data
	let crsOffsets: number[] = $state([]);
	let crsColumnId: number = $state(0);

	//geo specific data

	//grp specific data

	//def specific data

	//ext specific
	let extUrl: string = $state('');

	let stage1Condition = $derived(
		name.length == 0 ||
			description.length == 0 ||
			!thumbnail ||
			thumbnail?.length == 0,
	);
	let stage2Condition = $derived.by(() => {
		switch (type) {
			case 'CRS':
				return (
					crWords.length == 0 ||
					crClues.length == 0 ||
					crDescriptions.length == 0 ||
					crSolution.length == 0 ||
					crsOffsets.length == 0
				);
			case 'CRW':
				return (
					crWords.length == 0 ||
					crClues.length == 0 ||
					crDescriptions.length == 0 ||
					crSolution.length == 0
				);
			case 'DEF':
				return false;
			case 'GRP':
				return false;
			case 'GEO':
				return false;
			case 'EXT':
				return extUrl.length == 0;
			default:
				return true;
		}
	});
</script>

<svelte:head>
	<title>
		{m.createExercise()} | {m.idlgs()}
	</title>
</svelte:head>

<CreateArea
	color={data.color}
	darkMode={data.darkMode}
	texts={[
		m.exerciseType(),
		m.basicExerciseInformation(),
		m.exerciseStructure(),
		m.referencesToMaterial(),
		m.finish(),
	]}
	title={m.newExercise()}
	helpLink={resolve('/help/exercises/creation')}
	backLink={resolve('/(base)/textbook/[textbook]/exercises', {
		textbook: page.params.textbook!,
	})}
	emoji={'ri-function-add-line'}
	bind:stage
>
	<div class="flex w-full grow flex-col overflow-x-hidden overflow-y-scroll">
		{#if stage == 0}
			<TypeSelection
				color={data.color}
				darkMode={data.darkMode}
				bind:stage
				bind:type
			/>
		{:else if stage == 1}
			<BasicInformation
				darkMode={data.darkMode}
				color={data.color}
				bind:stage
				bind:name
				bind:description
				bind:thumbnail
			/>
		{:else if stage == 2}
			{#if type == 'CRS'}
				<CRSEditor
					bind:backgroundColorR
					bind:backgroundColorG
					bind:backgroundColorB
					bind:foregroundColorR
					bind:foregroundColorG
					bind:foregroundColorB
					bind:crsOffsets
					bind:crsColumnId
					bind:crWords
					bind:crClues
					bind:crDescriptions
					bind:crSolution
					color={data.color}
					darkMode={data.darkMode}
				/>
			{:else if type == 'CRW'}
				<CRWEditor
					darkMode={data.darkMode}
					color={data.color}
				 />
			{:else if type == 'DEF'}
				<DEFEditor 
					darkMode={data.darkMode}
					color={data.color}
				 />
			{:else if type == 'DFT'}
				<DFTEditor
					darkMode={data.darkMode}
					color={data.color}
				 />
			{:else if type == 'GRP'}
				<GRPEditor
					darkMode={data.darkMode}
					color={data.color}
				 />
			{:else if type == 'GEO'}
				<GEOEditor
					darkMode={data.darkMode}
					color={data.color}
				 />
			{:else if type == 'EXT'}
				<EXTEditor
					darkMode={data.darkMode}
					{name}
					color={data.color}
					bind:extUrl
				/>
			{/if}
		{:else if stage == 3}
			<Review />
		{/if}
	</div>
	{#if stage != 0}
		<Form
			target="?/make{type.toUpperCase()}"
			css="invisibleForm"
			darkMode={data.darkMode}
			color={data.color}
			success={async () => {
				goto(
					resolve('/(base)/textbook/[textbook]/exercises', {
						textbook: page.params.textbook!,
					}),
				);
			}}
			failure={async () => {
				stage--;
				addToast("Failed to create exercise", "error")
			}}
			start={async (formData) => {
				formData!.append('thumbnail', thumbnail[0]);
			}}
		>
			<input
				type="hidden"
				name="name"
				value={name}
			/>
			<input
				type="hidden"
				name="description"
				value={description}
			/>
			<input
				type="hidden"
				name="thumbnail"
				value={thumbnail}
			/>
			<input
				type="hidden"
				name="backgroundColorR"
				value={backgroundColorR}
			/>
			<input
				type="hidden"
				name="backgroundColorG"
				value={backgroundColorG}
			/>
			<input
				type="hidden"
				name="backgroundColorB"
				value={backgroundColorB}
			/>
			<input
				type="hidden"
				name="foregroundColorR"
				value={foregroundColorR}
			/>
			<input
				type="hidden"
				name="foregroundColorG"
				value={foregroundColorG}
			/>
			<input
				type="hidden"
				name="foregroundColorB"
				value={foregroundColorB}
			/>

			<PageControl
				bind:stage
				darkMode={data.darkMode}
				color={data.color}
				disableNext={(stage == 1 && stage1Condition) ||
					(stage == 2 && stage2Condition)}
				disablePrev={false}
				createText={m.createExercise()}
				nextButtonCreate={stage == 3}
			/>
		</Form>
	{/if}
</CreateArea>
