<script lang="ts">
	import { m } from '$lib/paraglide/messages';

	//themes defined in src/app.css, in order
	const colorList = [
		'#b91c1c', //'bg-red-700',
		'#c2410c', //'bg-orange-700',
		'#b45309', //'bg-amber-700',
		'#a16207', //'bg-yellow-700',
		'#15803d', //'bg-green-700',
		'#0f766e', //'bg-teal-700',
		'#1d4ed8', //'bg-blue-700',
		'#3730a3', //'bg-indigo-700',
		'#6b21a8', //'bg-purple-700',
		'#047857', //'bg-emerald-700',
		'#0891b2', //'bg-cyan-700',
		'#be185d', //'bg-pink-700',
		'#4d7c0f', //'bg-lime-700',
	];

	let {
		color = $bindable(''),
	}: {
		color: string;
	} = $props();
</script>

<div class="flex flex-row items-center gap-2">
	<div class="flex flex-row items-center gap-2">
		<h2 class="text-xl">{m.courseColor()}:</h2>

		<div
			class="flex flex-row items-center gap-0 *:rounded-none *:border-2 *:border-transparent *:p-2 *:first:rounded-s-lg *:last:rounded-e-lg"
		>
			{#each colorList as colorData (colorData)}
				<button
					onclick={() => {
						color = colorData;
					}}
					class="button-none hover:border-white {colorData === color
						? 'border-white!'
						: ''}"
					style="background-color: {colorData};"
					type="button"
					aria-label={m.colorSelectionButton()}
				>
					<i
						class="ri-circle-fill bg-clip m-2! text-neutral-800/40"
						style="background-color: {colorData};"
					></i>
				</button>
			{/each}
		</div>

		<span class="italic opacity-80">
			{m.orSelectACustomColor()}:
		</span>

		<input
			type="color"
			bind:value={color}
			class="input-color"
		/>
		<span class="opacity-80">
			{color}
		</span>
	</div>
</div>
