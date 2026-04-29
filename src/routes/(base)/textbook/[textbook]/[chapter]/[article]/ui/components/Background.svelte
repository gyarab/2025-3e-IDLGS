<script lang="ts">
	import { darkenHex } from "$lib";

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

<!-- color gets overwritten -->
<div
	class="from-emerald-500 to-emerald-200 fixed top-0 left-0 z-0! h-screen w-screen bg-linear-to-br to-100% bg-fixed"
	style="
		--tw-gradient-from-position: {percentRead}%;
		--tw-gradient-to: {darkenHex(accentColor, darkMode ? 20 : 0)};
		--tw-gradient-from: {darkenHex(accentColor, darkMode ? 100 : 50)};
	"
></div>
