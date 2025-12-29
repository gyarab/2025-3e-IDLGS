<script lang="ts">
	import { m } from '$lib/paraglide/messages';

	let {
		step = $bindable(0),
		name = $bindable(""), description = $bindable(""), red = $bindable(0), green = $bindable(0), blue = $bindable(0)
	} = $props();
</script>

<div class="flex w-full grow flex-col gap-2">
	<h2>{m.generalCourseSettings()}</h2>
</div>
