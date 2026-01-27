<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Form from '$component/Form.svelte';
	import SuccessBox from '$component/SuccessBox.svelte';
	import UnsavedChangesBox from '$component/UnsavedChangesBox.svelte';
	import WideCard from '$component/WideCard.svelte';
	import { setInputCallbacks } from '$lib';

	let { data } = $props();

	let showUnsavedChanges: boolean = $state(false);
	let formSuccessMessage: string = $state('');

	const inputElementChangeCallback = () => (showUnsavedChanges = true);
	const formSubmitChangeCallback = () => (showUnsavedChanges = false);

	setInputCallbacks(inputElementChangeCallback, formSubmitChangeCallback);
</script>

<WideCard cssAddition="grow">
	<h1>{m.textbookSettings()}</h1>

	<Form action="?/updateInformation">
		<h2>{m.textbookInformation()}</h2>
	</Form>

	<Form action="?/updateSettings">
		<h2>{m.textbookSettings()}</h2>
	</Form>

	<Form action="?/deleteTextbook">
		<h2>{m.textbookManagement()}</h2>
		<div
			class="flex w-full flex-col gap-2 *:flex *:grow *:flex-row *:items-center"
		>
			<div>
				<div class="grow"></div>
			</div>
		</div>
	</Form>
</WideCard>

<UnsavedChangesBox bind:show={showUnsavedChanges} />
<SuccessBox bind:message={formSuccessMessage} />
