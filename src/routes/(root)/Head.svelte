<script lang="ts">
	import Card from './components/Card.svelte';
</script>

<!-- TODO abstract common elements into classes, make page for testing!!! -->
<!-- TODO transitions -->

<div
	class="relative flex h-[90lvh] w-full flex-col items-center justify-center gap-6 overflow-hidden bg-violet-800 text-neutral-100 *:z-3"
>
	<!-- bg image -->
	<div
		class="absolute !z-1 h-[90lvh] max-h-[90lvh] min-h-[90lvh] w-screen max-w-screen min-w-screen"
	>
		<img src="./testimage.jpg" alt="BG" />
	</div>

	<!-- cover -->
	<div class="absolute !z-2 h-full w-full bg-violet-800/60"></div>

	<div class="grow"></div>

	<h5 class="flex flex-col items-center gap-2 text-7xl font-bold">
		<span>Electronic All-in-One</span>
		<!-- TODO other messages: exercise book etc. -->
		<span class="text-emerald-500"> Digital Textbook </span>
	</h5>
	<p class="w-1/2 text-center text-2xl">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi iusto porro nostrum dolore labore
		facilis obcaecati consectetur, exercitationem nesciunt dignissimos adipisci ullam deleniti
		doloribus, at et necessitatibus sint dolor placeat!
	</p>

	<!-- abstract + hover effects -->
	<div class="grid grid-cols-2 gap-4 *:text-xl">
		<button class="rounded-lg border-2 border-emerald-500 text-emerald-500"> Log in </button>
		<button class="rounded-lg bg-emerald-500 p-3 font-medium text-neutral-100">
			Request a demo
		</button>
	</div>

	<div
		class="
		grid w-2/3 grid-cols-3 gap-8
	"
	>
		<Card text="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
		<Card
			text="Eum veritatis praesentium sint eveniet hic ipsum, dolor voluptate vitae, neque magnam ea
			exercitationem"
		/>
		<Card text="enim tempora est minus delectus. Autem, assumenda quod!" />
	</div>

	<div class="grow"></div>
</div>
