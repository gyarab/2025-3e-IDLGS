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
	import type { CourseGradeType, UserRoleType } from '$lib/types';

	//this component stores the values which it then review submits to form action

	let {
		showModal = $bindable(),
	}: {
		showModal: boolean;
	} = $props();

	let stage = $state(0);
	let selected = $state('');

	let name: string = $state('');
	let subject: string = $state('');
	let description: string = $state('');

	//default values = tailwind's bg-violet-900
	let red: number = $state(101);
	let green: number = $state(7);
	let blue: number = $state(207);

	let selectedUsers: string[] = $state([]);
	let selectedUserRoles: UserRoleType[] = $state([]);

	//course only
	let selectedTextbookUuid: string = $state('');
	let courseGrades: CourseGradeType[] = $state([]);
	let inviteCode: string = $state('');

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
				<CourseTextbookSelect
					bind:step={stage}
					bind:selectedTextbookUuid
				/>
			{:else if stage == 2}
				<CourseBasicInfo
					bind:step={stage}
					bind:name
					bind:red
					bind:green
					bind:blue
					bind:description
					bind:subject
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
					bind:subject
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
		{/if}

		<!-- both -->
		{#if stage == 4}
			<Ownership
				bind:step={stage}
				{selected}
				bind:selectedUsers
				bind:selectedUserRoles
				{red}
				{green}
				{blue}
				type={selected}
			/>
		{:else if stage == 5}
			<Review
				bind:step={stage}
				{name}
				{subject}
				{red}
				{green}
				{blue}
				{description}
				type={selected}
				{selectedUsers}
				{selectedUserRoles}
				{articleNames}
				{chapterNames}
				{courseGrades}
				{inviteCode}
				bind:showModal
			/>
		{/if}
	</Modal>
{/key}
