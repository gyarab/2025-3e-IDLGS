<script lang="ts">
	import { darkenHex } from '$lib';
	import { m } from '$lib/paraglide/messages';

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
		};
	} = $props();

	let faqs = [
		{
			question: m.howDoICreateAnAccount(),
			answer: m.toCreateAnAccountClickOnTheLoginButton()
		},
		{
			question: m.howDoIAccessTextbooks(),
			answer: m.youCanBrowseAndAccessTextbooksFromTheLibrary()
		},
		{
			question: m.whatAreInteractiveExercises(),
			answer: m.interactiveExercisesAreDesignedToHelpYouPractice()
		},
		{
			question: m.howDoIContactSupport(),
			answer: m.youCanContactSupportByEmailingUsAtSupportIdlgsCom()
		}
	];
</script>

<svelte:head>
	<title>{m.faq()} | {m.idlgs()}</title>
</svelte:head>

<div
	class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4 pt-20"
	style="background: linear-gradient(135deg, {data.color}, {darkenHex(
		data.color,
		80,
	)}); --brand: {data.color};"
>
	<i
		class="ri-question-line absolute right-1/20 bottom-1/6 scale-200 rotate-15 text-9xl text-white opacity-20"
	></i>
	<i
		class="ri-lightbulb-line absolute top-1/4 left-1/20 scale-200 -rotate-15 text-9xl text-white opacity-20"
	></i>

	<div
		class="z-10 flex w-full max-w-4xl flex-col gap-6 rounded-3xl p-6 shadow-2xl backdrop-blur-sm sm:rounded-4xl md:p-8 {data.darkMode
			? 'bg-neutral-800/80 text-white'
			: 'bg-white/90 text-black'}"
	>
		<header class="text-center">
			<h1 class="text-3xl font-bold sm:text-4xl">{m.faq()}</h1>
			<p class="text-lg opacity-70">{m.frequentlyAskedQuestions()}</p>
		</header>

		<hr class="opacity-20" />

		<section class="space-y-6">
			{#each faqs as { question, answer }}
				<div class="rounded-2xl border p-6 {data.darkMode ? 'border-white/10 bg-neutral-700/50' : 'border-gray-200 bg-gray-50'}">
					<h3 class="mb-2 text-lg font-semibold">{question}</h3>
					<p class="opacity-80">{answer}</p>
				</div>
			{/each}
		</section>

		<hr class="opacity-20" />

		<section class="text-center">
			<h2 class="mb-4 text-xl font-bold">{m.stillNeedHelp()}</h2>
			<p class="mb-4 opacity-80">
				{m.cantFindWhatYoureLookingFor()} {m.contactOurSupportTeam()}.
			</p>
			<a href="mailto:support@idlgs.com" class="inline-flex items-center gap-2 rounded-2xl border px-6 py-3 font-semibold transition-colors {data.darkMode ? 'border-white/20 bg-neutral-700/50 hover:bg-neutral-700 text-white' : 'border-gray-300 bg-gray-100 hover:bg-gray-200 text-black'}">
				<i class="ri-mail-line"></i>
				{m.contactSupport()}
			</a>
		</section>
	</div>
</div>