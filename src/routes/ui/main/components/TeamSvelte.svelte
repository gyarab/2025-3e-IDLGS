<script lang="ts">
	let {
		name,
		role,
		description,
		darkMode,
		reverse = false,
	}: {
		name: string;
		role: string;
		description: string;
		darkMode: boolean;
		reverse?: boolean;
	} = $props();
</script>

<div
	class="grid w-full gap-2 rounded-2xl border p-4 transition-all sm:p-6
    grid-cols-[auto_1fr] sm:grid-rows-2
    {darkMode
		? 'border-white/10 bg-neutral-800/40'
		: 'border-black/5 bg-white/40'} 
    {reverse ? '[direction:rtl] text-right' : '[direction:ltr]'}"
>
	<div
		class="row-span-1 flex h-16 w-16 shrink-0 mx-4 items-center justify-center rounded-4xl bg-(--brand) text-white shadow-inner sm:row-span-2 sm:h-24 sm:w-24"
	>
		<img
			src="{name.split(' ', 1).toString().toLowerCase()}.jpg"
			alt={name.charAt(0).toUpperCase()}
            class="h-full w-full object-cover rounded-4xl"
		/>
	</div>

	<div class="flex flex-col justify-center">
		<h3 class="text-xl leading-tight font-bold sm:text-2xl">{name}</h3>
		<span
			class="text-xs font-black tracking-widest text-(--brand) uppercase opacity-80"
		>
			{role}
		</span>
	</div>

	<div class="col-span-2 mt-1 sm:col-span-1">
		<p class="text-sm leading-relaxed opacity-60 [direction:ltr] sm:text-base">
			{description}
		</p>
	</div>
</div>