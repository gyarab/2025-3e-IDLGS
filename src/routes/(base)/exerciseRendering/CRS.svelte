<script lang="ts">
	import CRWordDescription from './components/CRWordDescription.svelte';
	import CRWordElement from './components/CRWordElement.svelte';
	import Dialog from '../components/Dialog.svelte';
	import SelectionButton from '../components/SelectionButton.svelte';

	let {
		backgroundColorR,
		backgroundColorG,
		backgroundColorB,
		foregroundColorR,
		foregroundColorG,
		foregroundColorB,
		offsets = $bindable([]),
		columnId = $bindable(0),
		words = $bindable([]),
		clues = $bindable([]),
		descriptions = $bindable([]),
		solution = $bindable(''),
		editMode = false,
		color,
		darkMode,
	}: {
		backgroundColorR: number;
		backgroundColorG: number;
		backgroundColorB: number;
		foregroundColorR: number;
		foregroundColorG: number;
		foregroundColorB: number;
		offsets: number[];
		columnId: number;
		words: string[];
		clues: string[];
		descriptions: string[];
		solution: string;
		editMode?: boolean;
		color: string;
		darkMode: boolean;
	} = $props();

	let inputtedWords: string[] = $derived(new Array(words.length).fill(''));

	let correctCheckDialog = $state(false);
</script>

<div
	class="flex w-full grow flex-row overflow-scroll rounded-2xl"
	style="background-color: rgb({backgroundColorR}, {backgroundColorG}, {backgroundColorB}); color: rgb({foregroundColorR}, {foregroundColorG}, {foregroundColorB});"
>
	<div class="flex w-full grow flex-col items-center justify-center">
		<div class="flex flex-col gap-0">
			{#each words as word, i (i)}
				<div class="flex flex-row gap-2">
					<CRWordElement
						length={word.length}
						offset={offsets[i]}
						{columnId}
					>
						{#if editMode}
							<div
								class="flex w-20! flex-col justify-center ps-2 pe-2"
							>
								<SelectionButton
									css="buttonPrimary p-1!"
									style="background-color: {color};"
									emojis={[
										'arrow-left-double',
										'arrow-right-double',
									]}
									actions={[
										() => {
											if (offsets[i] == 0) return;
											offsets[i]--;
										},
										() => {
											offsets[i]++;
										},
									]}
									disabled={[offsets[i] == 0, false]}
								/>
							</div>
						{/if}
					</CRWordElement>
				</div>
			{/each}
			<!-- TODO improve -->
			<div class="flex w-full flex-row gap-0">
				{#if editMode}
					<div class="w-20"></div>
					<!-- offset for buttons -->
				{/if}
				{#each { length: columnId } as _, i (i)}
					<div class="w-16"></div>
				{/each}
				<div
					class="h-2 w-16"
					style="background-color: {color};"
				></div>
			</div>
		</div>
	</div>

	<!-- word descriptions -->
	<div class="flex min-w-1/4 flex-col gap-2 border-s border-black ps-2 pe-2">
		{#each descriptions as desc, i (i)}
			<CRWordDescription
				hint={clues[i]}
				description={desc}
				index={i}
				length={words[i].length}
			/>
		{/each}
	</div>

	{#if !editMode}
		<!-- TODO check button -->
	{/if}
</div>

<Dialog
	bind:open={correctCheckDialog}
	{darkMode}
>
	<div></div>
</Dialog>
