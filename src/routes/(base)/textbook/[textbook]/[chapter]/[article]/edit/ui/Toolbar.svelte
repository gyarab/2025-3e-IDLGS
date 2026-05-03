<script lang="ts">
	import FontEdit from './components/FontEdit.svelte';
	import Multimedia from './components/Multimedia.svelte';
	import RawMode from './components/RawMode.svelte';

	let {
		darkMode,
		color,
	}: {
		darkMode: boolean;
		color: string;
	} = $props();
</script>

<div
	class="flex w-full flex-row gap-2 rounded-lg p-2 {darkMode
		? 'bg-neutral-800 text-white'
		: 'bg-neutral-200 text-black'}"
>
	<FontEdit
		{darkMode}
		{color}
	/>
	<Multimedia
		{darkMode}
		{color}
	/>
	<RawMode
		{darkMode}
		{color}
	/>
</div>
