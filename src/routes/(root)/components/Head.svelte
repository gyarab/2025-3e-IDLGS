<script lang="ts">
	import { onMount } from 'svelte';
	import { m } from '$lib/paraglide/messages';
	import Button from './Button.svelte';
	import { goto } from '$app/navigation';
	import { fade, slide } from 'svelte/transition';
	import LearnMoreHeadCard from './LearnMoreHeadCard.svelte';
	import { getImageBackgroundClassRaw } from '$lib';

	let ready = $state(false);

	onMount(() => {
		ready = true;
	});
</script>

<!-- 96svh because header is 4svh (mobile is 8) -->
{#if ready}
	{#key ready}
		<div
			class="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden bg-blue-900 text-neutral-100 *:z-3 max-xl:min-h-[92svh] xl:min-h-[96svh]"
		>
			<!-- bg image -->
			<div
				class="absolute z-1! h-[96svh] max-h-[96svh] min-h-[96asvh] w-screen max-w-screen min-w-screen {getImageBackgroundClassRaw(
					1,
				)}"
			></div>

			<!-- cover -->
			<div class="absolute z-2! h-full w-full bg-blue-900/60"></div>

			<div class="grow"></div>

			<h5 class="flex flex-col items-center gap-2">
				<span
					class="m-0 p-0 text-4xl leading-9 font-medium"
					in:fade|global={{ duration: 500, delay: 100 }}
				>
					{m.fullyDigitalIntegratedAiPowered()}
				</span>
				<span
					class="flex flex-row gap-4 font-bold text-white **:decoration-5 max-xl:text-xl xl:text-7xl"
					in:fade|global={{ duration: 500, delay: 500 }}
				>
					<!-- always textbook 1 word, connector 1 word -->
					<span
						class="underline decoration-blue-900 decoration-dashed"
					>
						{m.textbookAndClassroom().split(' ')[0]}
					</span>
					<span>
						{m.textbookAndClassroom().split(' ')[1]}
					</span>
					<span
						class="underline decoration-cyan-600 decoration-dotted"
					>
						{m.textbookAndClassroom().split(' ').slice(2).join(' ')}
					</span>
				</span>
			</h5>
			<p
				class="flex flex-row gap-2 text-center max-xl:text-sm xl:text-2xl"
			>
				<span in:slide|global={{ duration: 500, delay: 600 }}>
					{m.easyToUse()}.
				</span>
				<span in:slide|global={{ duration: 500, delay: 900 }}>
					{m.powerful()}.
				</span>
				<span in:slide|global={{ duration: 500, delay: 1200 }}>
					{m.flexible()}.
				</span>
				<span in:slide|global={{ duration: 500, delay: 1500 }}>
					{m.withAI()}.
				</span>
				<span
					in:slide|global={{ duration: 500, delay: 2000 }}
					class="font-bold"
				>
					{m.forAll()}.
				</span>
			</p>

			<!-- abstract + hover effects -->
			<div class="grid grid-cols-2 gap-4 *:text-xl">
				<span
					class="*:h-full *:w-full"
					in:fade|global={{ duration: 500, delay: 600 }}
				>
					<Button
						emoji="login-box"
						btn="button-blue"
						onclick={() => {
							goto('/login');
						}}
					>
						{m.login()}
					</Button>
				</span>
				<span
					class="*:h-full *:w-full"
					in:fade|global={{ duration: 500, delay: 1100 }}
				>
					<Button
						emoji="survey"
						btn="button-blue"
						onclick={() => {
							goto('/#contact');
						}}
					>
						{m.requestADemo()}
					</Button>
				</span>
			</div>

			<div
				class="
		grid w-2/3 max-xl:grid-cols-1 max-xl:gap-4 xl:grid-cols-3 xl:gap-8
	"
			>
				<LearnMoreHeadCard
					emoji="lightbulb-ai"
					delay={2500}
					title={m.innovative()}
					text={m.innovativeTextMicrolearningPsychologyMotivation()}
				/>
				<LearnMoreHeadCard
					emoji="quill-pen-ai"
					delay={3000}
					title={m.designedWithCare()}
					text={m.designedWithCareText()}
				/>
				<LearnMoreHeadCard
					emoji="speak-ai"
					delay={3500}
					title={m.AIPowered()}
					text={m.AIPoweredTextQuestionGenerationTestGenerationAntiCheatingRephrasing()}
				/>
			</div>

			<div class="grow"></div>
		</div>
	{/key}
{/if}
