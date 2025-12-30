<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';
	import CreationModal from './creationModal/CreationModal.svelte';
	import CourseCard from './components/CourseCard.svelte';
	import type { CourseType, TextbookType, UserType } from '$lib/types';
	import LoadingAnimation from '../../components/LoadingAnimation.svelte';
	import TextbookCard from './components/TextbookCard.svelte';
	import WelcomeCard from './components/WelcomeCard.svelte';
	import AdditionCard from './components/AdditionCard.svelte';

	let ready = $state(false);
	let creationModal = $state(false);

	onMount(() => {
		ready = true;
	});

	let {
		data,
	}: {
		data: {
			courses: Promise<CourseType[]>;
			textbooks: Promise<TextbookType[]>;
			user: UserType;
		};
	} = $props();

	let searchValue = $state('');
</script>

{#if ready}
	{#key ready}
		<div
			class="flex w-full grow flex-col items-center justify-center max-xl:hidden"
		>
			<div class="z-3 flex w-3/4 grow flex-col gap-2">
				<div class="h-[5vh] min-h-[5vh]"></div>

				<h2 class="w-full text-left">
					{m.welcomeBackMessageName({ name: data.user.name })}
				</h2>

				<WelcomeCard user={data.user} />

				<div class="h-[5vh] min-h-[5vh]"></div>

				<div class="flex h-fit w-full flex-row gap-2">
					<h2 class="text-left">{m.coursesAndTextbooks()}</h2>
					<div class="grow"></div>
					<input
						type="text"
						bind:value={searchValue}
						class="input-text w-2/5"
						placeholder={m.searchCoursesAndTextbooks()}
					/>
				</div>

				{#await Promise.all([data.courses, data.textbooks])}
					<div
						class="flex w-full grow flex-col items-center justify-center"
					>
						<LoadingAnimation />
					</div>
				{:then [courses, textbooks]}
					{@const allItems = [
						...[...courses].map((v) => {
							return { ...v, type: 'c' as const };
						}),
						...[...textbooks].map((v) => {
							return { ...v, type: 't' as const };
						}),
					].sort(
						(a, b) =>
							b.modifiedAt.getTime() - a.modifiedAt.getTime(),
					)}
					<div class="grid grid-cols-4 gap-2">
						<AdditionCard onclick={() => (creationModal = true)} />

						{#each allItems as item, i (item.uuid)}
							{#if item.type == 'c'}
								<CourseCard
									perspective={false}
									delay={i * 100}
									course={{
										uuid: 'fasgdgsg',
										createdAt: new Date(),
										modifiedAt: new Date(),
										description: 'fawsdfs',
										red: Math.random() * 100 + 125,
										green: Math.random() * 100 + 125,
										blue: Math.random() * 100 + 125,
										name: 'namam',
										subject: 'biologie',
									}}
								/>
							{:else}
								<TextbookCard
									perspective={false}
									delay={i * 100}
									textbook={{
										uuid: 'fasgdgsg',
										createdAt: new Date(),
										modifiedAt: new Date(),
										description: 'fawsdfs',
										red: Math.random() * 100 + 125,
										green: Math.random() * 100 + 125,
										blue: Math.random() * 100 + 125,
										name: 'namam',
										summary: '',
									}}
								/>
							{/if}
						{/each}
					</div>
				{/await}
			</div>

			<div class="min-h-[5vh] grow"></div>
		</div>
	{/key}
{/if}

<CreationModal bind:showModal={creationModal} />
