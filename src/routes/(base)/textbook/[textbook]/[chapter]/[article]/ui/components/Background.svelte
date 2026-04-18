<script lang="ts">
	let {
		accentColor,
		percentRead = 0,
		darkMode,
	}: {
		accentColor: string;
		percentRead: number;
		darkMode: boolean;
	} = $props();
</script>

<div
	class="{darkMode
		? 'to-neutral-500!'
		: 'to-white!'} fixed top-0 left-0 z-0! h-screen w-screen bg-linear-to-br to-100% bg-fixed"
	style="
		--tw-gradient-from-position: {percentRead}%;
		--tw-gradient-from: {accentColor};
	"
></div>
