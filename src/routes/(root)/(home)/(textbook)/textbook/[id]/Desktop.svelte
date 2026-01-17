<script lang="ts">
	import { onMount } from 'svelte';
	import Sidebar from './components/desktop/Sidebar.svelte';
	import ContentPositioning from './components/desktop/ContentPositioning.svelte';

	let ready = $state(false);

	onMount(() => {
		ready = true;
	});

	let { data } = $props();
</script>

<!-- TODO finish, this is just desktop UI mockup -->
<div
	class="
	relative flex w-full grow flex-row justify-center *:flex
	*:flex-col max-xl:hidden
"
>
	<Sidebar />
	<ContentPositioning textbook={data.textbook} />
</div>
