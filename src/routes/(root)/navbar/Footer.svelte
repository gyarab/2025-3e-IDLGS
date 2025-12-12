<script lang="ts">
	import { m } from '$lib/paraglide/messages';
</script>

<div class="flex min-h-[20vh] flex-col items-center bg-black p-5 max-lg:hidden">
	<div class="grid w-8/10 grid-cols-2 gap-10 *:flex *:h-full *:grow *:flex-col *:gap-2">
		<div>
			<div class="flex w-full flex-row items-end gap-2">
				<h2>{m.textbookNameShort()}</h2>
				<p>
					{m.textbookNameLong()}
				</p>
			</div>
			<div>© Martin Bykov, Ali Yunussov, Kira Stepanova 2025-2026</div>
			<div>
				{m.allRightsReserved()}
			</div>
		</div>
	</div>
</div>
