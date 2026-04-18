<script lang="ts">
	import { goto } from "$app/navigation";
	import { m } from "$lib/paraglide/messages";
	import Button from "$src/routes/(base)/components/Button.svelte";

	let {
		data
	}: {
		data: {
			color: string;
			darkMode: boolean;
		}
	} = $props();
</script>

<div class="flex flex-col grow w-full items-center p-4" style="background-color: {data.color};">
	<div class="flex flex-col grow w-1/2 p-7 {data.darkMode ? "bg-neutral-700" : "bg-neutral-100"} rounded-lg shadow-lg">
		<div class="flex flex-row gap-1 mb-4 w-full items-center">
			<h1 class="">{m.textbookInteractiveExercises()}</h1>
			<h1 class="font-bold" style="color: {data.color} !important;">
				aaa
			</h1>
			<div class="grow"></div>
			<Button
				emoji="function-add"
				type="button"
				text={m.createExercise()}
				css="buttonPrimary"
				style="background-color: {data.color};"
				onclick={() => {
					goto("exercises/create");
				}}
			/>
		</div>
		<hr>
	</div>
</div>