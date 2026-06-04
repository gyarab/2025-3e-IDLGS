<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { env } from '$env/dynamic/public';
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
		</div>

		<div class="flex flex-col">
			<h2>
				{m.contactTheDevs()}:
			</h2>
			<div class="flex flex-row gap-2">
				<i class="ri-mail-send-line"></i>
				<a href="mailto:{env.PUBLIC_EMAIL_M}">Martin Bykov</a>
			</div>
			<div class="flex flex-row gap-2">
				<i class="ri-mail-send-line"></i>
				<a href="mailto:{env.PUBLIC_EMAIL_A}">Ali Yunussov</a>
			</div>
			<div class="flex flex-row gap-2">
				<i class="ri-mail-send-line"></i>
				<a href="mailto:{env.PUBLIC_EMAIL_K}">Kira Stepanova</a>
			</div>
		</div>
	</div>
</div>
