<script lang="ts">
	let {
		accentColor,
		percentRead = 0,
		darkMode
	}: {
		accentColor: string,
		percentRead: number,
		darkMode: boolean
	} = $props();
</script>

<div 
	class="{darkMode ? 'to-neutral-500!' : 'to-white!'} fixed left-0 top-0 w-screen h-screen z-0! bg-fixed bg-linear-to-br to-100%"
	style="
		--tw-gradient-from-position: {percentRead}%;
		--tw-gradient-from: {accentColor};
	"
>

</div>
