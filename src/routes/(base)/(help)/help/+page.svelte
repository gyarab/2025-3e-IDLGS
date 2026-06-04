<script lang="ts">
	import { darkenHex } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import HelpLink from '../../components/HelpLink.svelte';
	import { env } from '$env/dynamic/public';
	import LinkButton from '../../components/LinkButton.svelte';

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
		};
	} = $props();
</script>

<svelte:head>
	<title>{m.help()} | {m.idlgs()}</title>
</svelte:head>

<div
	class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4 pt-20"
	style="background: linear-gradient(135deg, {data.color}, {darkenHex(
		data.color,
		80,
	)}); --brand: {data.color};"
>
	<i
		class="ri-question-line absolute right-1/15 bottom-1/6 scale-200 rotate-15 text-9xl text-white opacity-20"
	></i>
	<i
		class="ri-book-open-line absolute top-1/4 left-1/15 scale-200 -rotate-15 text-9xl text-white opacity-20"
	></i>

	<div
		class="z-10 flex w-full max-w-4xl flex-col gap-6 rounded-3xl p-6 shadow-2xl backdrop-blur-sm sm:rounded-4xl md:p-8 {data.darkMode
			? 'bg-neutral-800/80 text-white'
			: 'bg-white/80 text-black'}"
	>
		<header class="text-center">
			<h1 class="text-3xl font-bold sm:text-4xl">{m.needHelp()}</h1>
			<!-- <p class="text-lg opacity-70">{m.needHelp()}</p> -->
		</header>

		<hr class="opacity-20" />

		<section>
			<h2 class="mb-4 text-xl font-bold">{m.gettingStarted()}</h2>
			<p class="mb-4 opacity-80">
				{m.welcomeToIdlgs()}. {m.hereAreSomeTipsToGetYouStarted()}.
			</p>
			<ul class="flex flex-col gap-3 opacity-80">
				<HelpLink
					href="/profile"
					icon="ri-user-line"
					label={m.checkOutYourProfilePage()}
				/>
				<HelpLink
					href="/textbook"
					icon="ri-book-line"
					label={m.browseTextbooks()}
				/>
				<HelpLink
					href="/settings"
					icon="ri-settings-4-line"
					label={m.adjustSomeSettings()}
				/>
			</ul>
		</section>

		<hr class="opacity-20" />

		<section>
			<h2 class="mb-4 text-xl font-bold">{m.features()}</h2>
			<p class="mb-4 opacity-80">
				{m.exploreTheFeaturesOfOurPlatform()}.
			</p>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<!--
                <div class="rounded-2xl border p-4 {data.darkMode ? 'border-white/10 bg-neutral-700/50' : 'border-gray-200 bg-gray-50'}">
					<h3 class="font-semibold">{m.exercisesP()}</h3>
					<p class="text-sm opacity-70">{m.practiceWithInteractiveExercises()}</p>
				</div>
				<div class="rounded-2xl border p-4 {data.darkMode ? 'border-white/10 bg-neutral-700/50' : 'border-gray-200 bg-gray-50'}">
					<h3 class="font-semibold">{m.progressTracking()}</h3>
					<p class="text-sm opacity-70">{m.trackYourLearningProgress()}</p>
				</div>
                -->
			</div>
		</section>

		<hr class="opacity-20" />

		<section>
			<h2 class="mb-4 text-xl font-bold">{m.contactSupport()}</h2>
			<p class="mb-4 opacity-80">
				{m.needMoreHelp()}
				{m.contactOurSupportTeam()}.
			</p>
			<div class="flex flex-col gap-4 sm:flex-row">
				<LinkButton
					darkMode={data.darkMode}
					href="mailto:{env.PUBLIC_EMAIL_M}"
					text={m.emailSupport()}
					icon="mail"
					/>

				<LinkButton
					darkMode={data.darkMode}
					href="/faq"
					text={m.faq()}
					icon="information"
				/>
			</div>
		</section>
	</div>
</div>
