<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import CreateArea from '../../components/creation/CreateArea.svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import BasicInformation from './ui/BasicInformation.svelte';
	import Structure from './ui/Structure.svelte';
	import Authors from './ui/Authors.svelte';
	import Resources from './ui/Resources.svelte';
	import Review from './ui/Review.svelte';
	import PageControl from '../../components/PageControl.svelte';

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
		};
	} = $props();

	let stage: number = $state(0);
</script>

<svelte:head>
	<title>
		{m.createTextbook()} | {m.idlgs()}
	</title>
</svelte:head>

<CreateArea
	color={data.color}
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
	{#if stage == 0}
		<BasicInformation
			darkMode={data.darkMode}
			color={data.color}
		/>
	{:else if stage == 1}
		<Structure
			darkMode={data.darkMode}
			color={data.color}
		/>
	{:else if stage == 2}
		<Resources
			darkMode={data.darkMode}
			color={data.color}
		/>
	{:else if stage == 3}
		<Authors
			darkMode={data.darkMode}
			color={data.color}
		/>
	{:else if stage == 4}
		<Review
			darkMode={data.darkMode}
			color={data.color}
		/>
	{/if}
	<PageControl
		bind:stage
		darkMode={data.darkMode}
		color={data.color}
		disableNext={false}
		disablePrev={false}
		createText={m.createTextbook()}
		nextButtonCreate={stage == 4}
	/>
</CreateArea>
