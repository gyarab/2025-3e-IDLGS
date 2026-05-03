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
	import Grading from './ui/Grading.svelte';
	import References from './ui/References.svelte';

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
		};
	} = $props();

	let stage: number = $state(0);

	//exercise temp data
	let type: string = $state('');
	let name: string = $state('');
	let description: string = $state('');
	let thumbnail: string = $state('');

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
		m.exerciseGrading(),
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
				<CRWEditor />
			{:else if type == 'DEF'}
				<DEFEditor />
			{:else if type == 'GRP'}
				<GRPEditor />
			{:else if type == 'GEO'}
				<GEOEditor />
			{:else if type == 'EXT'}
				<EXTEditor />
			{/if}
		{:else if stage == 3}
			<Grading />
		{:else if stage == 4}
			<References />
		{:else if stage == 5}
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
				//TODO popup message @AY-GA
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

			<!-- TODO -->

			<PageControl
				bind:stage
				darkMode={data.darkMode}
				color={data.color}
				disableNext={(stage == 1 &&
					(name.length == 0 ||
						description.length == 0 ||
						thumbnail.length == 0)) ||
					stage == 2 ||
					false}
				disablePrev={false}
				createText={m.createExercise()}
				nextButtonCreate={stage == 3}
			/>
		</Form>
	{/if}
</CreateArea>
