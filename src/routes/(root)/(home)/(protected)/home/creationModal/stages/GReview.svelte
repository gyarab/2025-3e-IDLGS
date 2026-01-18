<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Form from '$component/Form.svelte';
	import NextPrevious from '../components/NextPrevious.svelte';
	import CourseCard from '../../components/CourseCard.svelte';
	import TextbookCard from '../../components/TextbookCard.svelte';
	import type { CourseGradeType, UserRoleType } from '$lib/types';
	import Attribute from '../components/freview/Attribute.svelte';
	import HiddenInput from '$component/HiddenInput.svelte';

	let {
		step = $bindable(0),
		type,
		name,
		subject,
		description,
		red,
		green,
		blue,
		selectedUsers,
		selectedUserRoles,
		articleNames,
		chapterNames,
		courseGrades,
		inviteCode,
		internet,
		textbookSelected,
		showModal = $bindable(true),
		message = $bindable(''),
		isError = $bindable(false),
		inviteCodeUses,
		inviteCodeExpiry,
	}: {
		step: number;
		type: string;
		name: string;
		subject: string;
		description: string;
		red: number;
		green: number;
		blue: number;
		selectedUsers: string[];
		selectedUserRoles: UserRoleType[];
		articleNames: string[][];
		chapterNames: string[];
		courseGrades: CourseGradeType[];
		inviteCode: string;
		showModal: boolean;
		message: string;
		isError: boolean;
		internet: boolean;
		textbookSelected: string;
		inviteCodeUses: number;
		inviteCodeExpiry: Date;
	} = $props();
</script>

<Form
	action={type == 'course'
		? '/home/?/createCourse'
		: '/home/?/createTextbook'}
	success={async () => {
		showModal = false;
		isError = false;
		message =
			type == 'course'
				? m.courseCreatedSuccessfully()
				: m.textbookCreatedSuccessfully();
	}}
	failure={async () => {
		showModal = false;
		isError = true;
		message =
			type == 'course'
				? m.couldNotCreateCourse()
				: m.couldNotCreateTextbook();
	}}
	final={async () => {
		//reset values before form submission and next addition
		step = 0;
		type = '';
	}}
>
	<!-- inputs -->
	<HiddenInput
		name="name"
		value={name}
	/>
	<HiddenInput
		name="description"
		value={description}
	/>
	<HiddenInput
		name="subject"
		value={subject}
	/>
	<HiddenInput
		name="red"
		value={red}
	/>
	<HiddenInput
		name="green"
		value={green}
	/>
	<HiddenInput
		name="blue"
		value={blue}
	/>
	<HiddenInput
		name="users"
		value={JSON.stringify(selectedUsers)}
	/>
	<HiddenInput
		name="roles"
		value={JSON.stringify(selectedUserRoles)}
	/>

	{#if type == 'course'}
		<HiddenInput
			name="grades"
			value={JSON.stringify(courseGrades)}
		/>
		<HiddenInput
			name="inviteCode"
			value={inviteCode}
		/>
		<HiddenInput
			name="inviteCodeUses"
			value={inviteCodeUses}
		/>
		<HiddenInput
			name="textbookSelected"
			value={textbookSelected}
		/>
		<HiddenInput
			name="inviteCodeExpiry"
			value={inviteCodeExpiry.toISOString()}
		/>
	{:else}
		<HiddenInput
			name="chapters"
			value={JSON.stringify(chapterNames)}
		/>
		<HiddenInput
			name="articles"
			value={JSON.stringify(articleNames)}
		/>
		<HiddenInput
			name="internet"
			value={internet}
		/>
	{/if}

	<h2 class="">{m.summary()}</h2>
	<div class="flex grow flex-row">
		<div class="flex h-full flex-col gap-2">
			<Attribute
				{type}
				value={name}
				course={m.courseName()}
				textbook={m.textbookName()}
			/>
			<Attribute
				{type}
				value={subject}
				course={m.courseSubject()}
				textbook={m.textbookSubject()}
			/>
			{#if type == 'course'}
				<Attribute
					{type}
					value={courseGrades.map((grade) => grade.name).join(', ')}
					course={m.gradesInCourse()}
					textbook=""
				/>
				<Attribute
					{type}
					value={inviteCode}
					course={m.courseInviteCode()}
					textbook=""
				/>
			{/if}
			<Attribute
				{type}
				value={description}
				course={m.courseDescription()}
				textbook={m.textbookDescription()}
				valueLong={true}
			/>
		</div>
		<div class="grow"></div>
		<div class="flex flex-col items-center justify-center">
			{#if type == 'course'}
				<CourseCard
					perspective={true}
					delay={100}
					course={{
						uuid: 'none',
						name: name,
						createdAt: new Date(),
						modifiedAt: new Date(),
						red: red,
						green: green,
						blue: blue,
						subject: subject,
						description: description,
					}}
				/>
			{:else}
				<TextbookCard
					perspective={true}
					delay={100}
					textbook={{
						uuid: 'none',
						name: name,
						createdAt: new Date(),
						modifiedAt: new Date(),
						red: red,
						green: green,
						blue: blue,
						subject: subject,
						description: description,
						summary: '',
						public: false,
					}}
				/>
			{/if}
		</div>
	</div>
	<NextPrevious
		currentStep={type == 'course' ? 6 : 4}
		maxStep={type == 'course' ? 6 : 4}
		onclickLast={() => {
			step = 5;
		}}
		onclickNext={() => {}}
		isLast={true}
	/>
</Form>
