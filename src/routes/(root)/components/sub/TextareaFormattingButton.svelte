<script lang="ts">
	let {
		message,
		emoji,
		onclick,
	}: {
		message: string;
		emoji: string;
		onclick: () => void;
	} = $props();
</script>

<button
	class="flex flex-col items-center justify-center bg-transparent! p-0 text-xl font-bold"
	aria-label={message}
	{onclick}
	type="button"
>
	<i class="ri-{emoji}"></i>
</button>
