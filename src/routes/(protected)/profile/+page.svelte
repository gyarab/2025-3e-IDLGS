<script lang="ts">
	import { makeHex, darkenHex } from "$lib";
	import type { UserType } from "$lib/types";

	let {
		data
	}: {
		data: {
			user: UserType | null; // current logged in user
		},
	} = $props();

	const userColor = $derived(data.user ? makeHex(data.user.r, data.user.g, data.user.b) : '#ff8800');

	// Default gradient state
	let bgGradient = 'from-orange-400 to-rose-500';

	// Profile data
	let user = {
		name: 'Alex Rivera',
		role: 'Medical Student',
		bio: 'Currently studying Anatomy and Physiology. Lover of digital flashcards and dark roast coffee.',
		booksRead: 12,
		studyHours: 145,
	};

	const gradients = [
		{ name: 'Orange (Default)', class: 'from-orange-400 to-rose-500' },
		{ name: 'Ocean', class: 'from-blue-500 to-cyan-400' },
		{ name: 'Midnight', class: 'from-indigo-600 to-purple-700' },
		{ name: 'Nature', class: 'from-emerald-500 to-teal-600' },
	];
</script>

<div class="flex min-h-screen flex-col items-center bg-gray-50">
	<div
		class="h-40 w-full bg-linear-to-r from-white to-white relative shadow-inner transition-all duration-500"
		style="--tw-gradient-from: ${userColor}; --tw-gradient-to: ${darkenHex(userColor, 50)};"
	>
		<div
			class="absolute right-4 bottom-4 rounded-lg border border-white/30 bg-white/20 p-2 backdrop-blur-md"
		>
			<p
				class="mb-2 text-xs font-semibold tracking-wider text-white uppercase"
			>
				Customize Theme
			</p>
			<div class="flex gap-2">
				{#each gradients as g}
					<button
						onclick={() => (bgGradient = g.class)}
						class="h-6 w-6 rounded-full border-2 border-white transition-transform hover:scale-110 {g.class} bg-gradient-to-r"
						title={g.name}
					></button>
				{/each}
			</div>
		</div>
	</div>

	<div class="-mt-24 w-full max-w-4xl px-4 pb-12">
		<div
			class="flex flex-col items-start gap-8 rounded-2xl bg-white p-8 shadow-xl md:flex-row"
		>
			<div class="relative mx-auto md:mx-0">
				<div
					class="h-40 w-40 overflow-hidden rounded-2xl border-4 border-white bg-gray-200 shadow-lg"
				>
					<img
						src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
						alt="User Avatar"
					/>
				</div>
			</div>

			<div class="flex-1">
				<div class="mb-4 flex items-center justify-between">
					<h1 class="text-3xl font-bold text-gray-800">
						{user.name}
					</h1>
					<button
						class="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
					>
						Edit Profile
					</button>
				</div>

				<p
					class="mb-4 inline-block rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700"
				>
					{user.role}
				</p>

				<p class="mb-6 leading-relaxed text-gray-600">
					{user.bio}
				</p>

				<div class="grid grid-cols-2 gap-4 border-t pt-6">
					<div class="rounded-xl bg-gray-50 p-4">
						<p class="text-sm text-gray-500">Books in Library</p>
						<p class="text-2xl font-bold text-gray-800">
							{user.booksRead}
						</p>
					</div>
					<div class="rounded-xl bg-gray-50 p-4">
						<p class="text-sm text-gray-500">Study Hours</p>
						<p class="text-2xl font-bold text-gray-800">
							{user.studyHours}h
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-8">
			<h2 class="mb-4 text-xl font-bold text-gray-800">
				Recent Textbooks
			</h2>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
				{#each Array(3) as _, i}
					<div
						class="flex h-32 items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
					>
						<div
							class="h-20 w-16 flex-shrink-0 rounded bg-gray-200 shadow-sm"
						></div>
						<div>
							<div
								class="mb-2 h-4 w-24 rounded bg-gray-200"
							></div>
							<div class="h-3 w-16 rounded bg-gray-100"></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
