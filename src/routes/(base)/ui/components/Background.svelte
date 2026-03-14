<script lang="ts">
	let {
		accentColor,
		percentRead = 0
	}: {
		accentColor: string,
		percentRead: number
	} = $props();
</script>

<div 
	class="fixed left-0 top-0 w-screen h-screen z-0! bg-fixed bg-linear-to-br to-100% to-white!"
	style="
		--tw-gradient-from-position: {percentRead}%;
		--tw-gradient-from: {accentColor};
	"
>

</div>
