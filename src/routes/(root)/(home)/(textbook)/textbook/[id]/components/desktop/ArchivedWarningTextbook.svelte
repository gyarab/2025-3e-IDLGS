<script lang="ts">
	import WideCard from '$component/WideCard.svelte';
	import { m } from '$lib/paraglide/messages';
</script>

<!-- tailwind amber-600 -->
<WideCard
	r={225}
	g={113}
	b={0}
	cssOverride="flex flex-row gap-2 items-end p-5"
>
	<div class="flex flex-row items-center gap-1">
		<i class="ri-error-warning-line text-2xl"></i>
		<h2>{m.thisTextbookHasBeenArchived()}.</h2>
	</div>
	<p class="ps-2 text-lg opacity-80">
		{m.youCanNoLongerEditItsContents()}.
	</p>
</WideCard>
