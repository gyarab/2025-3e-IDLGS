<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Card from '../../components/Card.svelte';
</script>

<div class="relative flex grow flex-col items-center justify-center bg-[url(/testimage.jpg)]">
	<!-- bg image -->
	<div class="fixed !z-1 h-screen max-h-screen min-h-screen w-screen max-w-screen min-w-screen">
		<img src="./testimage.jpg" alt="BG" />
	</div>

	<!-- cover -->
	<div class="absolute !z-2 h-full w-full bg-violet-800/60"></div>

	<div class="grow"></div>
	<div class="z-3 flex w-3/4 grow-3 flex-col gap-2">
		<h2 class="w-full text-left">{m.welcomeBackMessageName({ name: 'NAME TODO' })}</h2>
		<div class="grid grid-cols-4 gap-2">
			<Card text="a" />
		</div>
	</div>
	<div class="grow"></div>
</div>
