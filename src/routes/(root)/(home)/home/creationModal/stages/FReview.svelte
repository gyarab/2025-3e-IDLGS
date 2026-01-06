<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Form from '$component/Form.svelte';
	import NextPrevious from '../components/NextPrevious.svelte';
	import CourseCard from '../../components/CourseCard.svelte';
	import TextbookCard from '../../components/TextbookCard.svelte';
	import type { CourseGradeType } from '$lib/types';

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
		articleNames,
		chapterNames,
		courseGrades,
		inviteCode,
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
		articleNames: string[];
		chapterNames: string[];
		courseGrades: CourseGradeType[];
		inviteCode: string;
	} = $props();
</script>

<Form
	action={type == 'course'
		? '/home/?/createCourse'
		: '/home/?/createTextbook'}
>
	<!-- inputs -->

	<h2>{m.summary()}</h2>
	<div class="flex grow flex-row">
		<div></div>
		<div class="flex grow flex-col items-center justify-center">
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
