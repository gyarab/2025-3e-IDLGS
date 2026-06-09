<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { darkenHex } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import { fly } from 'svelte/transition';
	import LinkButton from '../components/LinkButton.svelte';

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
			answer: m.toCreateAnAccountClickOnTheLoginButton(),
		},
		{
			question: m.howDoIAccessTextbooks(),
			answer: m.youCanBrowseAndAccessTextbooksFromTheLibrary(),
		},
		{
			question: m.whatAreInteractiveExercises(),
			answer: m.interactiveExercisesAreDesignedToHelpYouPractice(),
		},
		// {
		// 	question: m.howDoIContactSupport(),
		// 	answer: m.youCanContactSupportByEmailingUsAt()
		// }
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
		class="z-10 flex w-full max-w-4xl flex-col gap-6 rounded-3xl
			p-6 shadow-xl backdrop-blur-sm sm:rounded-4xl md:p-8 {data.darkMode
			? 'bg-neutral-800/80 text-white'
			: 'bg-white/80 text-black'}"
	>
		<header class="text-center">
			<h1 class="text-3xl font-bold sm:text-4xl">{m.faq()}</h1>
			<p class="text-lg opacity-70">{m.frequentlyAskedQuestions()}</p>
		</header>

		<hr class="opacity-20" />

		<section class="space-y-4">
			{#each faqs as { question, answer }}
				<div
					class="rounded-2xl border p-4 {data.darkMode
						? 'border-white/10 bg-neutral-600/50'
						: 'border-black/10 bg-neutral-100'}"
					in:fly={{
						x: 100,
						y: 0,
						duration: 300,
						delay: 0,
						opacity: 0,
					}}
				>
					<h3 class="mb-2 text-lg font-semibold">{question}</h3>
					<p class="opacity-80">{answer}</p>
				</div>
			{/each}
		</section>

		<hr class="opacity-20" />

		<section class="text-center">
			<h2 class="text-xl font-bold">{m.stillNeedHelp()}</h2>
			<p class="mt-3 mb-4 opacity-80">
				{m.cantFindWhatYoureLookingFor()}
				{m.contactOurSupportTeam()}.
			</p>
			<LinkButton
				darkMode={data.darkMode}
				href="mailto:{env.PUBLIC_EMAIL_M}"
				icon="mail"
				text={m.contactSupport()}
			/>
		</section>
	</div>
</div>
