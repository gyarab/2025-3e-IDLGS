<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';
	import Card from '../../components/Card.svelte';
	import WideCard from '../../components/WideCard.svelte';
	import { writeDays } from '$lib/plural';

	let ready = $state(false);

	onMount(() => {
		ready = true;
	});

	let { data } = $props();
</script>

{#if ready}
	{#key ready}
		<div
			class="relative flex grow flex-col items-center justify-center bg-[url(/testimage.jpg)] bg-contain bg-fixed max-lg:hidden"
		>
			<!-- cover -->
			<div class="absolute z-2! h-full w-full bg-violet-800/60"></div>

			<div class="z-3 flex w-3/4 grow flex-col gap-2">
				<div class="min-h-[10vh]"></div>
				<h2 class="w-full text-left">{m.welcomeBackMessageName({ name: 'NAME TODO' })}</h2>

				<WideCard>
					<div class="grid w-full grid-cols-2 gap-10 *:flex *:flex-col *:gap-2">
						<div>
							<div class="flex w-full flex-row items-center gap-2">
								{#if data.user.extended}
									<i class="ri-fire-fill text-5xl text-amber-600"></i>
								{:else}
									<i class="ri-fire-line text-5xl text-neutral-300"></i>
								{/if}
								<h2>{m.streak()}: {data.user.streak} {writeDays(data.user.streak)}</h2>
							</div>
						</div>
						<div>
							<div class="flex w-full flex-row items-center gap-2">
								<i class="ri-calendar-todo-line text-5xl text-neutral-300"></i>
								<h2>{m.dailyChallenges()}</h2>
							</div>
						</div>
					</div>
				</WideCard>

				<h2 class="w-full text-left">{m.coursesAndTextbooks()}</h2>
				<div class="grid grid-cols-4 gap-2">
					<!-- TEMP list of cards -->
					{#each { length: 15 } as a, i (i)}
						<!-- temp eslint workaround TODO remove -->
						<span class="hidden">{a}</span>
						<Card
							text={crypto.randomUUID()}
							r={Math.random() * 100 + 125}
							g={Math.random() * 100 + 125}
							b={Math.random() * 100 + 125}
							delay={i * 100}
						/>
					{/each}
				</div>
			</div>

			<div class="min-h-[10vh] grow"></div>
		</div>
	{/key}
{/if}
