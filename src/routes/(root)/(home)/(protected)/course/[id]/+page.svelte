<script lang="ts">
	import type {
		CourseType,
		CourseAssignmentType,
		CourseMessageType,
	} from '$lib/types';
	import { m } from '$lib/paraglide/messages';
	import WideCard from '$component/WideCard.svelte';
	import Assignment from './components/Assignment.svelte';
	import Message from './components/Message.svelte';

	let {
		data,
	}: {
		data: {
			course: CourseType;
			isTeacher: boolean;
			isOwner: boolean;
		};
	} = $props();

	let allItems = $derived.by(() => {
		return [
			...(data.course.assignments?.map((a) => {
				return { ...a, type: 'assignment' as const };
			}) ?? []),
			...(data.course.messages?.map((m) => {
				return { ...m, type: 'message' as const };
			}) ?? []),
		];
	});
</script>

{#each allItems as item (item.uuid)}
	{#if item.type === 'assignment'}
		<Assignment assignment={item} />
	{:else if item.type === 'message'}
		<Message message={item} />
	{/if}
{/each}
