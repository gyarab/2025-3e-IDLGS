<script lang="ts">
	interface Props {
		href: string;
		icon: string;
		label: string;
	}

	let { href, icon, label }: Props = $props();
</script>

<li>
	<a
		{href}
		class="group flex items-center gap-3 py-1 transition-colors hover:text-(--brand)"
	>
		<div
			class="flex h-8 w-8 items-center justify-center transition-colors group-hover:scale-105"
		>
			<i class="{icon} text-lg transition-transform group-hover:scale-110"
			></i>
		</div>
		<span class="font-medium underline-offset-4 group-hover:underline">
			{label}
		</span>
	</a>
</li>
