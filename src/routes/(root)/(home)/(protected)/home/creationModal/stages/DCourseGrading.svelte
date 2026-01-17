<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import SelectionInput from '$component/SelectionInput.svelte';
	import NextPrevious from '../components/NextPrevious.svelte';
	import type { CourseGradeType } from '$lib/types';
	import Timeline from '../components/dcoursegrading/Timeline.svelte';
	import {
		CZECH_GRADES,
		CZECH_LANGUAGE_GRADES,
		ENGLISH_GRADES,
		GERMAN_GRADES,
		POLISH_GRADES,
		RUSSIAN_GRADES,
	} from '$lib';

	let {
		step = $bindable(0),
		grades = $bindable([]),
		red,
		green,
		blue,
	}: {
		step: number;
		grades: CourseGradeType[];
		red: number;
		green: number;
		blue: number;
	} = $props();

	let selectedGradePreset: string = $state('');
</script>

<div class="flex w-full grow flex-col gap-2">
	<h2>{m.gradesInCourse()}</h2>
	<div class="flex w-full flex-col items-center gap-4">
		<p class="w-full opacity-50">
			{m.selectAGradingPreset()}
		</p>

		<SelectionInput
			bind:value={selectedGradePreset}
			names={[
				m.czechGrades(),
				m.englishGrades(),
				m.polishGrades(),
				m.germanGrades(),
				m.russianGrades(),
				m.czechGradesForLanguage(),
				m.customGrades(),
			]}
			values={[
				'czech',
				'english',
				'polish',
				'german',
				'russian',
				'language',
				'custom',
			]}
			onchange={(v) => {
				switch (v) {
					case 'czech':
						grades = CZECH_GRADES;
						break;
					case 'english':
						grades = ENGLISH_GRADES;
						break;
					case 'polish':
						grades = POLISH_GRADES;
						break;
					case 'german':
						grades = GERMAN_GRADES;
						break;
					case 'russian':
						grades = RUSSIAN_GRADES;
						break;
					case 'language':
						grades = CZECH_LANGUAGE_GRADES;
						break;
					case 'custom':
						grades = [];
						break;
				}
			}}
		/>
	</div>
	<div class="flex w-full grow flex-col items-center gap-4">
		<Timeline
			bind:grades
			{red}
			{green}
			{blue}
		/>
	</div>
	<NextPrevious
		currentStep={3}
		maxStep={5}
		onclickLast={() => {
			step = 2;
		}}
		onclickNext={() => {
			step = 4;
		}}
		disableConditionNext={false}
	/>
</div>
