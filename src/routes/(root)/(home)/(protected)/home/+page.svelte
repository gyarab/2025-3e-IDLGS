<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { CourseType, TextbookType, UserType } from '$lib/types';
	import { onMount } from 'svelte';
	import CreationModal from './creationModal/CreationModal.svelte';
	import CourseCard from './components/CourseCard.svelte';
	import TextbookCard from './components/TextbookCard.svelte';
	import WelcomeCard from './components/WelcomeCard.svelte';
	import AdditionCard from './components/AdditionCard.svelte';
	import LoadingAnimationHandler from '$component/LoadingAnimationHandler.svelte';
	import SuccessBox from '$component/SuccessBox.svelte';
	import AlertBox from '$component/AlertBox.svelte';
	import { isInQuery } from '$lib';
	import { goto } from '$app/navigation';
	import CardSeparator from '$component/CardSeparator.svelte';

	let ready = $state(false);
	let creationModal = $state(false);
	let successMessage = $state('');
	let isErrorMessage = $state(false);

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

<svelte:head>
	<title>
		{m.overview()} - {m.textbookNameShort()}
	</title>
</svelte:head>

{#if ready}
	{#key ready}
		<div class="flex w-full grow flex-col items-center">
			<div class="z-3 flex grow flex-col gap-2 max-xl:w-full xl:w-3/4">
				<CardSeparator />

				<h2 class="w-full max-xl:text-center xl:text-left">
					<i class="ri-user-smile-line text-xl"></i>
					{m.welcomeBackMessageName({ name: data.user.name })}
				</h2>

				<WelcomeCard user={data.user} />

				<CardSeparator />

				<div
					class="flex h-fit w-full items-center gap-2 max-2xl:flex-col 2xl:flex-row"
				>
					<i class="ri-layout-grid-line text-xl"></i>
					<h2 class="text-left">{m.coursesAndTextbooks()}</h2>
					<div class="grow"></div>
					<input
						type="text"
						bind:value={searchValue}
						class="input-text max-2xl:w-full 2xl:w-2/5"
						placeholder={m.searchCoursesAndTextbooks()}
					/>
				</div>

				{#await Promise.all([data.courses, data.textbooks])}
					<LoadingAnimationHandler />
				{:then [courses, textbooks]}
					{@const allItems = [
						...[...courses].map((v) => {
							return { ...v, type: 'c' as const };
						}),
						...[...textbooks].map((v) => {
							return { ...v, type: 't' as const };
						}),
					]
						.sort(
							(a, b) =>
								b.modifiedAt.getTime() - a.modifiedAt.getTime(),
						)
						.filter((v) =>
							isInQuery(
								searchValue,
								v.name,
								v.description,
								v.subject,
							),
						)}
					{@const archivedItems = allItems.filter((v) => v.archived)}
					{@const activeItems = allItems.filter((v) => !v.archived)}

					{#if activeItems.length === 0 && !data.user.canCreateCourses && !data.user.canCreateTextbooks}
						<div
							class="flex w-full grow flex-col items-center justify-center gap-2 text-lg font-light opacity-80"
						>
							{m.noCoursesOrTextbooksAvailableYet()}
						</div>
					{:else if activeItems.length === 0 && searchValue.length > 0}
						<div
							class="flex w-full grow flex-col items-center justify-center gap-2 text-lg font-light opacity-80"
						>
							{m.noCoursesOrTextbooksMatchYourSearch()}
						</div>
					{:else}
						<div
							class="grid gap-2 max-xl:grid-cols-1 xl:grid-cols-4"
						>
							{#if searchValue.length == 0 && (data.user.canCreateCourses || data.user.canCreateTextbooks)}
								<AdditionCard
									onclick={() => (creationModal = true)}
								/>
							{/if}

							{#each activeItems as item, i (item.uuid)}
								{#if item.type == 'c'}
									<CourseCard
										perspective={false}
										delay={i * 100}
										course={item as CourseType}
										onclick={() =>
											goto(`/course/${item.uuid}`)}
									/>
								{:else}
									<TextbookCard
										perspective={false}
										delay={i * 100}
										textbook={item as TextbookType}
										onclick={() =>
											goto(`/textbook/${item.uuid}`)}
									/>
								{/if}
							{/each}
						</div>
					{/if}

					<CardSeparator />

					<div
						class="flex h-fit w-full items-center gap-2 max-2xl:flex-col max-xl:text-center xl:text-left 2xl:flex-row"
					>
						<i class="ri-archive-line text-xl"></i>
						<h2 class="max-xl:text-center xl:text-left">
							{m.archivedCoursesAndTextbooks()}
						</h2>
						<div class="grow"></div>
						<p class="opacity-80">
							{m.archivedCoursesAndTextbooksAreReadOnlyEverythingIsLeftAsItWasAtTheMomentOfArchiving()}
						</p>
					</div>

					{#if archivedItems.length === 0 && searchValue.length === 0}
						<div
							class="flex w-full grow flex-col items-center justify-center gap-2 text-lg font-light opacity-80"
						>
							{m.noArchivedCoursesOrTextbooksYet()}
						</div>
					{:else if archivedItems.length === 0 && searchValue.length > 0}
						<div
							class="flex w-full grow flex-col items-center justify-center gap-2 text-lg font-light opacity-80"
						>
							{m.noArchivedCoursesOrTextbooksMatchYourSearch()}
						</div>
					{:else}
						<div class="grid grid-cols-4 gap-2">
							{#each archivedItems as item, i (item.uuid)}
								{#if item.type == 'c'}
									<CourseCard
										perspective={false}
										delay={i * 100}
										course={item as CourseType}
										onclick={() =>
											goto(`/course/${item.uuid}`)}
									/>
								{:else}
									<TextbookCard
										perspective={false}
										delay={i * 100}
										textbook={item as TextbookType}
										onclick={() =>
											goto(`/textbook/${item.uuid}`)}
									/>
								{/if}
							{/each}
						</div>
					{/if}

					<CardSeparator />
				{/await}
			</div>
		</div>
	{/key}
{/if}

<CreationModal
	bind:showModal={creationModal}
	bind:message={successMessage}
	bind:isError={isErrorMessage}
	user={data.user}
/>

{#if isErrorMessage}
	<AlertBox bind:message={successMessage} />
{:else}
	<SuccessBox bind:message={successMessage} />
{/if}
