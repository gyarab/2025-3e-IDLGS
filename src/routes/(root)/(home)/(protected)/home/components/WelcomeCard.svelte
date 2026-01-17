<script lang="ts">
	import type { UserType } from '$lib/types';
	import WideCard from '$component/WideCard.svelte';
	import { m } from '$lib/paraglide/messages';
	import { writeDays } from '$lib/plural';

	let {
		user,
	}: {
		user: UserType;
	} = $props();
</script>

<WideCard>
	<div
		class="grid h-[30vh] w-full grid-cols-2 gap-10 *:flex *:flex-col *:gap-2"
	>
		<div>
			<div class="flex w-full flex-row items-center gap-2">
				{#if user.extended}
					<i class="ri-fire-fill text-5xl text-amber-600"></i>
				{:else}
					<i class="ri-fire-line text-5xl text-neutral-300"></i>
				{/if}
				<h2>
					{m.streak()}: {user.streak}
					{writeDays(user.streak)}
				</h2>
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
