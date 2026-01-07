<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Form from '$component/Form.svelte';
	import NextPrevious from '../components/NextPrevious.svelte';
	import CourseCard from '../../components/CourseCard.svelte';
	import TextbookCard from '../../components/TextbookCard.svelte';
	import type { CourseGradeType, UserRoleType } from '$lib/types';
	import Attribute from '../components/freview/Attribute.svelte';

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
		showModal = $bindable(true),
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
		articleNames: string[];
		chapterNames: string[];
		courseGrades: CourseGradeType[];
		inviteCode: string;
		showModal: boolean;
	} = $props();
</script>

<Form
	action={type == 'course'
		? '/home/?/createCourse'
		: '/home/?/createTextbook'}
	success={async () => {
		showModal = false;
	}}
>
	<!-- inputs -->
	<input type="hidden" name="name" value={name} />
	<input type="hidden" name="description" value={description} />
	<input type="hidden" name="subject" value={subject} />
	<input type="hidden" name="red" value={red} />
	<input type="hidden" name="green" value={green} />
	<input type="hidden" name="blue" value={blue} />
	<input type="hidden" name="users" value={JSON.stringify(selectedUsers)} />
	<input type="hidden" name="roles" value={JSON.stringify(selectedUserRoles)} />

	{#if type == 'course'}
		<input type="hidden" name="grades" value={JSON.stringify(courseGrades)} />
		<input type="hidden" name="code" value={inviteCode} />
	{:else}
		<input type="hidden" name="articles" value={JSON.stringify(articleNames)} />
		<input type="hidden" name="chapters" value={JSON.stringify(chapterNames)} />
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
			{#if type=='course'}
				<!-- TODO other attribs-->
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
					}}
				/>
			{/if}
		</div>
	</div>
	<NextPrevious
		currentStep={type == 'course' ? 5 : 4}
		maxStep={type == 'course' ? 5 : 4}
		onclickLast={() => {
			step = 4;
		}}
		onclickNext={() => {
			//reset values before form submission and next addition
			step = 0;
			type = '';
		}}
		isLast={true}
	/>
</Form>
