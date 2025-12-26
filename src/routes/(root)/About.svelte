<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import CallToAction from './components/about/CallToAction.svelte';
	import History from './components/about/History.svelte';
	import MeetTheTeam from './components/about/MeetTheTeam.svelte';
	import Mission from './components/about/Mission.svelte';
</script>

<div class="flex w-full grow flex-col bg-white">
	<Mission />

	<History />

	<!-- and about team as well -->
	<MeetTheTeam />

	<CallToAction />
</div>
