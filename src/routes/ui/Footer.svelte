<script lang="ts">
	import { m } from '$lib/paraglide/messages';
</script>

<!-- Footer.svelte -->
<div
	class="relative z-5 flex h-[20svh] w-full min-w-screen! grow flex-row justify-center bg-neutral-700! pt-5 pb-5 text-white!"
>
	<div class="grid w-2/3 grid-cols-2 gap-2 *:justify-center">
		<div class="flex flex-col gap-0">
			<h2>
				© {m.idlgs()} 2026
			</h2>
			<span>
				{m.allRightsReserved()}.
			</span>
			<div class="h-2"></div>
			<h2>
				{m.contactUs()}:
			</h2>
			<div class="flex flex-row gap-2">
				<i class="ri-mail-send-line"></i>
				<a href="mailto:idylliceggs@gmail.com">idylliceggs@gmail.com</a>
			</div>
		</div>
		<div class="flex flex-col gap-0">
			<h2>
				{m.contactTheDevs()}:
			</h2>
			<div class="flex flex-row gap-2">
				<i class="ri-mail-send-line"></i>
				<a href="mailto:martin.bykov.s@gyarab.cz">Martin Bykov</a>
			</div>
			<div class="flex flex-row gap-2">
				<i class="ri-mail-send-line"></i>
				<a href="mailto:ali.yunussov.s@gyarab.cz">Ali Yunussov</a>
			</div>
			<div class="flex flex-row gap-2">
				<i class="ri-mail-send-line"></i>
				<a href="mailto:kira.stepanova.@gyarab.cz">Kira Stepanova</a>
			</div>
		</div>
	</div>
</div>
