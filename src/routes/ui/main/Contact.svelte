<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { darkenHex } from '$lib';
	import { getLocale } from '$lib/paraglide/runtime';
	import { PUBLIC_EMAIL_M } from '$env/static/public';

	let {
		darkMode,
		color,
	}: {
		darkMode: boolean;
		color: string;
	} = $props();

	let locale = $derived(getLocale());
</script>

<div
	class="relative flex min-h-1/2 w-full flex-col items-center justify-center overflow-hidden p-4"
	style="background: linear-gradient(135deg, {color}, {darkenHex(
		color,
		80,
	)}); --brand: {color};"
>
	<i
		class="ri-mail-send-line absolute right-1/15 bottom-1/6 scale-200 rotate-15 text-9xl text-white opacity-20"
	></i>
	<i
		class="ri-customer-service-2-line absolute top-1/4 left-1/15 scale-200 -rotate-15 text-9xl text-white opacity-20"
	></i>

	<div
		class="z-10 flex w-full max-w-2xl flex-col gap-6 rounded-3xl p-6 shadow-2xl backdrop-blur-xs sm:rounded-4xl md:p-8 {darkMode
			? 'bg-black/60 text-white'
			: 'bg-white/80 text-black'}"
	>
		<header class="flex items-center gap-6">
			<div
				class="flex h-16 w-16 items-center justify-center rounded-2xl border-2 text-3xl sm:h-20 sm:w-20"
				style:border-color="var(--brand)"
				style:color="var(--brand)"
			>
				<i class="ri-chat-smile-3-line"></i>
			</div>
			<div>
				<h1 class="text-2xl font-bold sm:text-3xl">{m.contact()}</h1>
				<p class="text-sm font-medium opacity-60 sm:text-base">
					{#if locale === 'cs'}
						Máte otázky? Napište nám.
					{:else if locale === 'pl'}
						Masz pytania? Napisz do nas.
					{:else}
						Have questions? Drop us an email.
					{/if}
				</p>
			</div>
		</header>

		<hr class="opacity-20" />

		<section>
			<div
				class="flex items-center justify-between gap-4 rounded-2xl border p-4 transition-transform hover:scale-[1.02] {darkMode
					? 'border-white/10 bg-neutral-700/50'
					: 'border-brand/10 bg-brand/5'}"
			>
				<div class="flex-1 overflow-hidden">
					<h3
						class="mb-1 text-xs font-bold tracking-widest uppercase opacity-50"
					>
						{locale === 'cs'
							? 'Podpora'
							: locale === 'pl'
								? 'Wsparcie'
								: 'Support'}
					</h3>
					<p class="text-sm font-semibold sm:text-base">
						Martin Bykov
					</p>
					<p class="truncate text-sm opacity-60">{PUBLIC_EMAIL_M}</p>
				</div>

				<a
					href="mailto:{PUBLIC_EMAIL_M}"
					class="flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
					style="background-color: var(--brand); color: white;"
					aria-label="Email support"
				>
					<i class="ri-mail-line text-xl"></i>
				</a>
			</div>
		</section>

		<footer class="text-center">
			<p class="text-xs opacity-40">
				© {m.idlgs()} 2026 • {m.allRightsReserved()}
			</p>
		</footer>
	</div>
</div>
