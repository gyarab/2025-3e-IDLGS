<script lang="ts">
	import Button from '../../components/Button.svelte';
	import Form from '../../components/Form.svelte';
	import TextInput from '../../components/TextInput.svelte';

	// TODO AI playground
</script>

<div>
	<Form action="?/testAI">
		<h1>AI</h1>
		<TextInput name="prompt" />
		<Button
			btn="button-primary"
			type="submit"
		>
			Submit
		</Button>
	</Form>
</div>
