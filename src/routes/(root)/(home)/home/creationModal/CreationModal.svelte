<script lang="ts">
	import Modal from '../../../components/Modal.svelte';
	import SelectType from './ASelectType.svelte';
	import CourseBasicInfo from './CCourseBasicInfo.svelte';
	import TextbookBasicInfo from './CTextbookBasicInfo.svelte';
	import CourseGrading from './DCourseGrading.svelte';
	import Ownership from './EOwnership.svelte';
	import Review from './FReview.svelte';
	import TextbookArticles from './DTextbookArticles.svelte';
	import CourseTextbookSelect from './BCourseTextbookSelect.svelte';

	let {
		showModal = $bindable(),
	}: {
		showModal: boolean;
	} = $props();

	let stage = $state(0);
	let selected = $state("");
</script>

<Modal
	bind:showModal
	cssClass="bg-violet-700"
>
	{#if stage == 0}
		<!-- both -->
		<SelectType bind:value={selected} bind:stage />
	{/if}
	
	<!-- course only -->
	{#if selected=="course"}
		{#if stage == 1}
			<CourseTextbookSelect />
		{:else if stage == 2}
			<CourseBasicInfo />
		{:else if stage == 3}
			<CourseGrading />
		{/if}
	{/if}

	<!-- textbook only -->
	 {#if selected=="textbook"}
		{#if stage == 2}
			<TextbookBasicInfo />
		{:else if stage == 3}
			<TextbookArticles />
		{/if}
	 {/if}

	<!-- both -->
	 {#if stage == 4}
		<Ownership />
	{:else if stage == 5}
		<Review />
	{/if}
</Modal>
