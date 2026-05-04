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
			: 'bg-white/90 text-black'}"
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
			<ul class="list-disc list-inside space-y-2 opacity-80">
				<li>{m.createAnAccount()}</li>
				<li>{m.browseTextbooks()}</li>
				<li>{m.startReading()}</li>
			</ul>
		</section>

		<hr class="opacity-20" />

		<section>
			<h2 class="mb-4 text-xl font-bold">{m.features()}</h2>
			<p class="mb-4 opacity-80">
				{m.exploreTheFeaturesOfOurPlatform()}.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
				{m.needMoreHelp()} {m.contactOurSupportTeam()}.
			</p>
			<div class="flex flex-col sm:flex-row gap-4">
				<a href="mailto:support@idlgs.com" class="flex items-center gap-2 rounded-2xl border px-4 py-2 transition-colors {data.darkMode ? 'border-white/20 bg-neutral-700/50 hover:bg-neutral-700' : 'border-gray-300 bg-gray-100 hover:bg-gray-200'}">
					<i class="ri-mail-line"></i>
					{m.emailSupport()}
				</a>
				<a href="/faq" class="flex items-center gap-2 rounded-2xl border px-4 py-2 transition-colors {data.darkMode ? 'border-white/20 bg-neutral-700/50 hover:bg-neutral-700' : 'border-gray-300 bg-gray-100 hover:bg-gray-200'}">
					<i class="ri-question-line"></i>
					{m.faq()}
				</a>
			</div>
		</section>
	</div>
</div>