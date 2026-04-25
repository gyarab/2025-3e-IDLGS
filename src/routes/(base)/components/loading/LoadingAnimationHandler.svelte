<script lang="ts">
	import LoadingAnimation from './LoadingAnimation.svelte';

	let {
		text = true,
		smallerBubbles = false,
		textColorR = 0,
		textColorG = 0,
		textColorB = 0,
	}: {
		text?: boolean;
		smallerBubbles?: boolean;
		textColorR?: number;
		textColorG?: number;
		textColorB?: number;
	} = $props();
</script>

<div class="flex w-full grow flex-col items-center justify-center gap-2">
	<LoadingAnimation
		{text}
		{smallerBubbles}
		{textColorR}
		{textColorG}
		{textColorB}
	/>
</div>
