<script lang="ts">
	import type { CourseMessageType } from '$lib/types';
	import WideCard from '$component/WideCard.svelte';

	let {
		message,
	}: {
		message: CourseMessageType;
	} = $props();
</script>

<WideCard>MESSAGE</WideCard>
