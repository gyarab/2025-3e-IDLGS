<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Form from '$component/Form.svelte';
	import NextPrevious from '../components/NextPrevious.svelte';

	let {
		step = $bindable(0),
		type,
		name,
		description,
		red,
		green,
		blue,
	} = $props();
</script>

<Form
	action={type == 'course'
		? '/home/?/createCourse'
		: '/home/?/createTextbook'}
>
	<h2>{m.summary()}</h2>
	<div class="grow"></div>
	<NextPrevious
		currentStep={type == 'course' ? 5 : 4}
		maxStep={type == 'course' ? 5 : 4}
		onclickLast={() => {
			step = type == 'course' ? 4 : 3;
		}}
		onclickNext={() => {}}
		disableConditionNext={description.length == 0 || name.length == 0}
	/>
</Form>
