<script lang="ts">
	import { onMount } from 'svelte';
	import Card from './Card.svelte';
	import { m } from '$lib/paraglide/messages';

	let ready = $state(false);

	onMount(() => {
		ready = true;
	});
</script>

<!-- TODO abstract common elements into classes, make page for testing!!! -->
<!-- TODO transitions -->

{#if ready}
	{#key ready}
		<div
			class="relative flex h-[90lvh] w-full flex-col items-center justify-center gap-6 overflow-hidden bg-violet-800 text-neutral-100 *:z-3"
		>
			<!-- bg image -->
			<div
				class="absolute z-1! h-[90lvh] max-h-[90lvh] min-h-[90lvh] w-screen max-w-screen min-w-screen"
			>
				<img
					src="./testimage.jpg"
					alt="BG"
				/>
			</div>

			<!-- cover -->
			<div class="absolute z-2! h-full w-full bg-violet-800/60"></div>

			<div class="grow"></div>

			<h5 class="flex flex-col items-center gap-2">
				<span class="m-0 p-0 text-4xl leading-9 font-medium"
					>{m.electronicIntegratedAiPowered()}</span
				>
				<span class="text-7xl font-bold text-emerald-500"
					>{m.learningAndGradingSystem()}</span
				>
			</h5>
			<p class="w-1/2 text-center text-2xl">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
				iusto porro nostrum dolore labore facilis obcaecati consectetur,
				exercitationem nesciunt dignissimos adipisci ullam deleniti
				doloribus, at et necessitatibus sint dolor placeat!
			</p>

			<!-- abstract + hover effects -->
			<div class="grid grid-cols-2 gap-4 *:text-xl">
				<a
					class="button-primary button"
					href="/login"
				>
					Log in
				</a>
				<a
					class="button-violet button"
					href="/contact"
				>
					Request a demo
				</a>
			</div>

			<div
				class="
		grid w-2/3 grid-cols-3 gap-8
	"
			>
				<Card
					delay={100}
					perspective={true}
					>orem ipsum dolor sit amet consectetur adipisicing elit."</Card
				>
				<Card
					delay={600}
					perspective={true}
				>
					Eum veritatis praesentium sint eveniet hic ipsum, dolor
					voluptate vitae, neque magnam ea exercitationem
				</Card>
				<Card
					delay={1100}
					perspective={true}
				>
					enim tempora est minus delectus. Autem, assumenda quod
				</Card>
			</div>

			<div class="grow"></div>
		</div>
	{/key}
{/if}
