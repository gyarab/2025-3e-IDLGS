<script lang="ts">
	import { onMount } from 'svelte';
	import Card from './components/Card.svelte';

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

			<h5 class="flex flex-col items-center gap-2 text-7xl font-bold">
				<span>Electronic All-in-One</span>
				<!-- TODO other messages: exercise book etc. -->
				<span class="text-emerald-500"> Digital Textbook </span>
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
					class="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-emerald-500 text-emerald-500"
					href="/login"
				>
					Log in
				</a>
				<a
					class="flex flex-col items-center justify-center gap-2 rounded-lg bg-emerald-500 p-3 font-medium text-neutral-100"
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
