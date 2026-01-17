<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import CardSeparator from '../../../components/CardSeparator.svelte';
</script>

<div class="flex w-full grow flex-col items-center gap-2 max-xl:hidden">
	<div class="flex w-3/4 grow flex-col gap-2">
		<CardSeparator />

		<h2 class="w-full text-left">
			<i class="ri-line-chart-line"></i>
			{m.myGrades()}
		</h2>
	</div>
</div>
