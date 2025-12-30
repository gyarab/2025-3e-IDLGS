<script lang="ts">
	let {
		message,
		emoji,
		onclick
	}: {
		message: string;
		emoji: string;
		onclick: () => void;
	} = $props();
</script>

<button
	class="p-0 bg-transparent! flex flex-col justify-center items-center text-xl font-bold"
	aria-label={message}
	onclick={onclick}
>
	<i class="ri-{emoji}"></i>
</button>




