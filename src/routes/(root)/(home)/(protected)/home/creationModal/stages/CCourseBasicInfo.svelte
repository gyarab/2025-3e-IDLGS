<script lang="ts">
	// mostly a copy of CTextbookBasicInfo.svelte
	// with "textbook" replaced by "course" and some other minor changes

	import { m } from '$lib/paraglide/messages';
	import NextPrevious from '../components/NextPrevious.svelte';
	import Textarea from '$component/Textarea.svelte';
	import { MAX_NAME_LENGTH } from '$lib';
	import ColorSelect from '../components/basicinfo/ColorSelect.svelte';

	let {
		step = $bindable(0),
		name = $bindable(''),
		description = $bindable(''),
		red = $bindable(0),
		green = $bindable(0),
		blue = $bindable(0),
		subject = $bindable(''),
	} = $props();

	let color = $state(
		'#' +
			red.toString(16).padStart(2, '0') +
			green.toString(16).padStart(2, '0') +
			blue.toString(16).padStart(2, '0'),
	); //bg-violet-700
	$effect(() => {
		red = parseInt(color.slice(1, 3), 16);
		green = parseInt(color.slice(3, 5), 16);
		blue = parseInt(color.slice(5, 7), 16);
	});
</script>

<div class="flex w-full grow flex-col gap-2">
	<h2>{m.generalCourseSettings()}</h2>
	<div class="flex flex-row items-center gap-2">
		<h2 class="text-xl">{m.courseName()}:</h2>
		<input
			type="text"
			class="input-text grow"
			maxlength={MAX_NAME_LENGTH}
			bind:value={name}
			placeholder={m.enterCourseName()}
		/>
	</div>
	<div class="flex flex-row items-center gap-2">
		<h2 class="text-xl">{m.courseSubject()}:</h2>
		<input
			type="text"
			class="input-text grow"
			maxlength={MAX_NAME_LENGTH}
			bind:value={subject}
			placeholder={m.enterCourseSubject()}
		/>
	</div>
	<ColorSelect bind:color />
	<div class="flex grow flex-col gap-2">
		<h2 class="text-xl">{m.courseDescription()}:</h2>
		<Textarea
			bind:value={description}
			placeholder={m.enterCourseDescription()}
		/>
	</div>
	<NextPrevious
		currentStep={2}
		maxStep={6}
		onclickLast={() => {
			step = 1;
		}}
		onclickNext={() => {
			step = 3;
		}}
		disableConditionNext={description.length == 0 ||
			name.length == 0 ||
			subject.length == 0}
	/>
</div>
