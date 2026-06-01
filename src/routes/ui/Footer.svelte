<script lang="ts">
	import { m } from '$lib/paraglide/messages';
</script>

<div
	class="relative z-5 flex w-full grow flex-row justify-center
            bg-linear-to-tr from-neutral-800
           via-neutral-700 to-neutral-800! py-4 pb-20 text-white! sm:pb-8"
>
	<div class="grid grid-cols-2 gap-2 px-3 *:justify-center sm:w-2/3">
		<div class="flex flex-col">
			<h2>
				© {m.idlgs()} 2026
			</h2>
			<span>
				{m.allRightsReserved()}.
			</span>
			<a
				href="/privacy"
				class="text-sm underline opacity-80 transition-opacity hover:opacity-100"
			>
				{m.privacyPolicy()}
			</a>
			<div class="h-2"></div>
			<!--
			<h2>
				{m.contactUs()}:
			</h2>
			<div class="flex flex-row gap-2">
				<i class="ri-mail-send-line"></i>
				<a href="mailto:idylliceggs@gmail.com">idylliceggs@gmail.com</a>
			</div>
			-->
		</div>
		<div class="flex flex-col">
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
				<a href="mailto:kira.stepanova.s@gyarab.cz">Kira Stepanova</a>
			</div>
		</div>
	</div>
</div>
