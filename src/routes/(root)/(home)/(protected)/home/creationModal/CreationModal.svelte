<script lang="ts">
	import Modal from '$component/Modal.svelte';
	import SelectType from './stages/ASelectType.svelte';
	import CourseBasicInfo from './stages/CCourseBasicInfo.svelte';
	import TextbookBasicInfo from './stages/CTextbookBasicInfo.svelte';
	import CourseGrading from './stages/DCourseGrading.svelte';
	import Ownership from './stages/FOwnership.svelte';
	import Review from './stages/GReview.svelte';
	import CourseInviteCode from './stages/ECourseInviteCode.svelte';
	import TextbookArticles from './stages/DTextbookArticles.svelte';
	import CourseTextbookSelect from './stages/BCourseTextbookSelect.svelte';
	import type {
		CourseGradeType,
		UserRoleType,
		UserType,
		UserTypeLimited,
	} from '$lib/types';

	//this component stores the values which it then review submits to form action

	let {
		showModal = $bindable(),
		message = $bindable(''),
		isError = $bindable(false),
		user,
	}: {
		showModal: boolean;
		message: string;
		isError: boolean;
		user: UserType;
	} = $props();

	let stage = $state(0);
	let selected = $state('');

	let name: string = $state('');
	let subject: string = $state('');
	let description: string = $state('');

	//default values = tailwind's bg-violet-700
	let red: number = $state(101);
	let green: number = $state(7);
	let blue: number = $state(207);

	let selectedUsers: UserTypeLimited[] = $state([]);

	//course only
	let selectedTextbookUuid: string = $state('');
	let courseGrades: CourseGradeType[] = $state([]);
	let inviteCode: string = $state('');
	let inviteCodeUses: number = $state(0); //0 = unlimited
	let inviteCodeExpiry: Date = $state(new Date(3000, 1, 1)); //default: far future (no expiry)

	//textbook only
	let articleNames: string[][] = $state([]); //per chapter
	let chapterNames: string[] = $state([]);
	let internet: boolean = $state(false);
</script>

{#key stage}
	<Modal
		bind:showModal
		cssClass="backdrop-blur-xl"
		cssStyle="background-color: rgb({red}, {green}, {blue}, 0.7) !important;"
	>
		{#if stage == 0}
			<!-- both -->
			<SelectType
				bind:value={selected}
				bind:stage
				{user}
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
				<CourseGrading
					bind:step={stage}
					bind:grades={courseGrades}
					{red}
					{green}
					{blue}
				/>
			{:else if stage == 4}
				<CourseInviteCode
					bind:inviteCode
					bind:step={stage}
					bind:inviteCodeUses
					bind:inviteCodeExpiry
				/>
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
		{#if stage == 5}
			<Ownership
				bind:step={stage}
				{selected}
				bind:selectedUsers
				{red}
				{green}
				{blue}
				type={selected}
				bind:internet
			/>
		{:else if stage == 6}
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
				{articleNames}
				{chapterNames}
				{courseGrades}
				{inviteCode}
				bind:showModal
				bind:message
				bind:isError
				{internet}
				textbookSelected={selectedTextbookUuid}
				{inviteCodeUses}
				{inviteCodeExpiry}
			/>
		{/if}
	</Modal>
{/key}
