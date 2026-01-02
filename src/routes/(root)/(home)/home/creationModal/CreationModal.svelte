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

	//this component stores the values which it then review submits to form action

	let {
		showModal = $bindable(),
	}: {
		showModal: boolean;
	} = $props();

	let stage = $state(0);
	let selected = $state('');

	let name: string = $state('');
	let description: string = $state('');

	//default values = tailwind's bg-violet-900
	let red: number = $state(101);
	let green: number = $state(7);
	let blue: number = $state(207);

	//course only
	let selectedTextbookUuid: string = $state("");

	//textbook only
	let articleNames: string[] = $state([]);
	let chapterNames: string[] = $state([]);
</script>

{#key stage}
	<Modal
		bind:showModal
		cssClass="backdrop-blur"
		cssStyle="background-color: rgb({red}, {green}, {blue}, 0.5) !important;"
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
				<CourseTextbookSelect bind:step={stage} bind:selectedTextbookUuid />
			{:else if stage == 2}
				<CourseBasicInfo
					bind:step={stage}
					bind:name
					bind:red
					bind:green
					bind:blue
					bind:description
				/>
			{:else if stage == 3}
				<CourseGrading bind:step={stage} />
			{/if}
			<!-- textbook only -->
		{:else if selected == 'textbook'}
			{#if stage == 2}
				<TextbookBasicInfo
					bind:step={stage}
					bind:name
					bind:red
					bind:green
					bind:blue
					bind:description
				/>
			{:else if stage == 3}
				<TextbookArticles
					bind:step={stage}
					bind:articleNames
					bind:chapterNames
					{red}
					{green}
					{blue}
				/>
			{/if}
		{:else if stage != 0 && stage < 4}
			INVALID SITUATION.
		{/if}

		<!-- both -->
		{#if stage == 4}
			<Ownership bind:step={stage} {selected} />
		{:else if stage == 5}
			<Review
				bind:step={stage}
				{name}
				{red}
				{green}
				{blue}
				{description}
				type={selected}
			/>
		{/if}
	</Modal>
{/key}
