<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import WideCard from "$component/WideCard.svelte";
	import type { CourseQuestionType, CourseType } from "$lib/types";

	let {
		data
	}: {
		data: {
			course: CourseType;
			questions: CourseQuestionType[];
		}
	} = $props();
</script>

<WideCard cssAddition="grow">
	<h2>TODO questions</h2>
</WideCard>