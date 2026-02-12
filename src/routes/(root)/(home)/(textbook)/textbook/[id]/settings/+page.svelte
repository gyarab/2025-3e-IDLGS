<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Form from '$component/Form.svelte';
	import SuccessBox from '$component/SuccessBox.svelte';
	import UnsavedChangesBox from '$component/UnsavedChangesBox.svelte';
	import WideCard from '$component/WideCard.svelte';
	import { setInputCallbacks } from '$lib';
	import Button from '$component/Button.svelte';

	let { data } = $props();

	let showUnsavedChanges: boolean = $state(false);
	let formSuccessMessage: string = $state('');

	const inputElementChangeCallback = () => (showUnsavedChanges = true);
	const formSubmitChangeCallback = () => (showUnsavedChanges = false);

	setInputCallbacks(inputElementChangeCallback, formSubmitChangeCallback);
</script>

<svelte:head>
	<title>
		{m.textbookSettings()} - {data.textbook.name} - {m.textbookNameShort()}
	</title>
</svelte:head>

<WideCard
	cssAddition="grow"
	r={data.textbook.red / 5 + 80}
	g={data.textbook.green / 5 + 80}
	b={data.textbook.blue / 5 + 80}
>
	<h1>{m.textbookSettings()}</h1>

	<Form action="?/updateInformation">
		<h2>{m.textbookInformation()}</h2>
		<div class="flex w-full grow flex-col"></div>
	</Form>

	<Form action="?/updateSettings">
		<h2>{m.textbookSettings()}</h2>
	</Form>

	<Form action="?/deleteTextbook">
		<h2>{m.textbookManagement()}</h2>
		<div
			class="flex w-full flex-col gap-2 *:flex *:grow *:flex-row *:items-center *:gap-2"
		>
			<div>
				<span class="text-lg">{m.archiveTextbook()}</span>
				<span class="text-sm opacity-80"
					>{m.archivingTheTextbookWillMakeItReadOnly()}.</span
				>
				<div class="grow"></div>
				<Button
					btn="button-red"
					emoji="archive"
				>
					{m.archive()}
				</Button>
			</div>
			<div>
				<span class="text-lg">{m.deleteTextbook()}</span>
				<span class="text-sm opacity-80"
					>{m.deletingTheTextbookIsAnIrreversibleAction()}.</span
				>
				<div class="grow"></div>
				<Button
					btn="button-red"
					emoji="archive"
				>
					{m.delete()}
				</Button>
			</div>
		</div>
	</Form>
</WideCard>

<UnsavedChangesBox bind:show={showUnsavedChanges} />
<SuccessBox bind:message={formSuccessMessage} />
