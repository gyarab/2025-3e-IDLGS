<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import TextArea from '$src/routes/(base)/components/TextArea.svelte';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
	import { fly } from 'svelte/transition';
	import Form from '$src/routes/(base)/components/Form.svelte';

	let {
		darkMode,
		color,
	}: {
		darkMode: boolean;
		color: string;
	} = $props();
</script>

<div class="flex w-full grow flex-col gap-2">
	<div
		class="mb-2 flex w-full flex-row items-center gap-2"
		in:fly={{ x: 1000, y: 0, duration: 300, delay: 100, opacity: 0 }}
	>
		<h2 class="text-2xl font-bold">{m.reviewInformation()}</h2>
		<p>{m.reviewInformationDescription()}</p>
	</div>
	<Form
		target="?/makeTextbook"
		{darkMode}
		css="flex flex-col w-full grow gap-2"
	>
		<input
			type="hidden"
			name="name"
		/>
	</Form>
</div>
