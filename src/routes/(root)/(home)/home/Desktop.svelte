<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';
	import Card from '../../components/Card.svelte';
	import WideCard from '../../components/WideCard.svelte';
	import { writeDays } from '$lib/plural';
	import CreationModal from './creationModal/CreationModal.svelte';
	import CourseCard from './components/CourseCard.svelte';
	import type { CourseType, TextbookType, UserType } from '$lib/types';
	import LoadingAnimation from '../../components/LoadingAnimation.svelte';
	import TextbookCard from './components/TextbookCard.svelte';

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

	let allItems: (
		| (CourseType & { type: 'c' })
		| (TextbookType & { type: 't' })
	)[] = $derived.by(() => {
		let c: CourseType[] = [];
		let t: TextbookType[] = [];

		data.courses.then((v) => {
			c = v;
		});
		data.textbooks.then((v) => {
			t = v;
		});

		return [
			...[...c].map((v) => {
				return { ...v, type: 'c' as const };
			}),
			...[...t].map((v) => {
				return { ...v, type: 't' as const };
			}),
		].sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime());
	});
</script>

{#if ready}
	{#key ready}
		<div
			class="flex grow flex-col items-center justify-center max-xl:hidden w-full"
		>
			<div class="z-3 flex w-3/4 grow flex-col gap-2">
				<div class="min-h-[5vh]"></div>
				<h2 class="w-full text-left">
					{m.welcomeBackMessageName({ name: data.user.name })}
				</h2>

				<WideCard>
					<div
						class="grid min-h-[30vh] w-full grid-cols-2 gap-10 *:flex *:flex-col *:gap-2"
					>
						<div>
							<div
								class="flex w-full flex-row items-center gap-2"
							>
								{#if data.user.extended}
									<i
										class="ri-fire-fill text-5xl text-amber-600"
									></i>
								{:else}
									<i
										class="ri-fire-line text-5xl text-neutral-300"
									></i>
								{/if}
								<h2>
									{m.streak()}: {data.user.streak}
									{writeDays(data.user.streak)}
								</h2>
							</div>
						</div>
						<div>
							<div
								class="flex w-full flex-row items-center gap-2"
							>
								<i
									class="ri-calendar-todo-line text-5xl text-neutral-300"
								></i>
								<h2>{m.dailyChallenges()}</h2>
							</div>
						</div>
					</div>
				</WideCard>

				<div class="h-[5vh]"></div>
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
				{:then}
					<div class="grid grid-cols-4 gap-2">
						<Card
							perspective={false}
							onclick={() => {
								creationModal = true;
							}}
							hover={true}
						>
							<div
								class="group flex w-full grow flex-col items-center justify-center gap-2"
							>
								<span class="text-5xl">
									<i
										class="ri ri-add-circle-line group-hover:hidden"
									></i>
									<i
										class="ri-add-circle-fill not-group-hover:hidden"
									></i>
								</span>
								<span class="text-3xl">
									{m.addNew()}
								</span>
							</div>
						</Card>

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

			<div class="min-h-[10vh] grow"></div>
		</div>
	{/key}
{/if}

<CreationModal bind:showModal={creationModal} />
