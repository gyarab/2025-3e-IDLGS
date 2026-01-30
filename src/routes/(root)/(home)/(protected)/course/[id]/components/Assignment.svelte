<script lang="ts">
	import WideCard from '$component/WideCard.svelte';
	import type { CourseAssignmentType } from '$lib/types';

	let {
		assignment,
	}: {
		assignment: CourseAssignmentType;
	} = $props();
</script>

<WideCard>ASSIGNMENT</WideCard>
