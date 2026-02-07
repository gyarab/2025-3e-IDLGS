<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';
	import Button from '$component/Button.svelte';
	import Card from '$component/Card.svelte';
</script>

<div class="flex w-full grow flex-col items-center justify-center">
	<Card
		padding="p-6"
		perspective={true}
	>
		<div class="grow"></div>
		<h2 class="text-5xl font-bold">
			{m.anErrorOccurred()}
		</h2>
		<p class="text-lg font-light! opacity-80">
			{#if page.status === 404}
				{m.noChapterOrArticleAtThisAddress()}
			{:else}
				{m.errorMessage()}:
				{page.error!.message}
			{/if}
		</p>
		<div class="grow"></div>
		<Button
			btn="button-primary"
			cssClass="w-full"
			emoji="arrow-left-s"
			onclick={() => {
				goto(`/textbook/${page.params.id}/`);
			}}
		>
			{m.goBackToTextbookHomepage()}
		</Button>
	</Card>
</div>
