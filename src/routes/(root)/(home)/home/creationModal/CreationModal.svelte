<script lang="ts">
	import Modal from '../../../components/Modal.svelte';
	import SelectType from './stages/ASelectType.svelte';
	import CourseBasicInfo from './stages/CCourseBasicInfo.svelte';
	import TextbookBasicInfo from './stages/CTextbookBasicInfo.svelte';
	import CourseGrading from './stages/DCourseGrading.svelte';
	import Ownership from './stages/EOwnership.svelte';
	import Review from './stages/FReview.svelte';
	import TextbookArticles from './stages/DTextbookArticles.svelte';
	import CourseTextbookSelect from './stages/BCourseTextbookSelect.svelte';
	import { step } from '$lib/paraglide/messages';
	import type { CourseType } from '$lib/types';

	let {
		showModal = $bindable(),
	}: {
		showModal: boolean;
	} = $props();

	let stage = $state(0);
	let selected = $state('');

	let name: string = $state("");
	let description: string = $state("");
	let red: number = $state(0);
	let green: number = $state(0);
	let blue: number = $state(0);
</script>

{#key stage}
	<Modal
		bind:showModal
		cssClass="bg-violet-700"
	>
		{#if stage == 0}
			<!-- both -->
			<SelectType
				bind:value={selected}
				bind:stage
			/>
		{/if}

		<!-- course only -->
		{#if selected == 'course'}
			{#if stage == 1}
				<CourseTextbookSelect bind:step={stage} />
			{:else if stage == 2}
				<CourseBasicInfo bind:step={stage} bind:name bind:red bind:green bind:blue bind:description/>
			{:else if stage == 3}
				<CourseGrading bind:step={stage} {name} {red} {green} {blue} {description} />
			{/if}
		<!-- textbook only -->
		{:else if selected == 'textbook'}
			{#if stage == 2}
				<TextbookBasicInfo bind:step={stage} bind:name bind:red bind:green bind:blue bind:description />
			{:else if stage == 3}
				<TextbookArticles bind:step={stage} {name} {red} {green} {blue} {description} />
			{/if}
		{:else}
			{#if stage != 0 && stage < 4}
				INVALID SITUATION.
			{/if}
		{/if}

		<!-- both -->
		{#if stage == 4}
			<Ownership bind:step={stage} {name} {red} {green} {blue} {description} />
		{:else if stage == 5}
			<Review bind:step={stage} {name} {red} {green} {blue} {description} />
		{/if}
	</Modal>
{/key}
