<script lang="ts">
    let { 
        name, 
        role,
        description, 
        darkMode, 
        reverse = false 
    }: { 
        name: string; 
        role: string;
        description: string; 
        darkMode: boolean;
        reverse?: boolean;
    } = $props();
</script>

<div 
    class="flex w-full items-center gap-6 rounded-2xl border p-4 transition-all hover:scale-[1.01] sm:p-6 
    {darkMode ? 'border-white/10 bg-neutral-800/40' : 'border-black/5 bg-white/40'} 
    {reverse ? 'flex-row-reverse text-right' : 'flex-row'}"
>
    <div 
        class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-(--brand) text-white shadow-inner sm:h-20 sm:w-20"
    >
        <span class="text-2xl font-black uppercase">{name.charAt(0)}</span>
    </div>

    <div class="flex flex-col gap-1">
        <div class="flex flex-col {reverse ? 'items-end' : 'items-start'}">
            <h3 class="text-xl font-bold leading-tight sm:text-2xl">{name}</h3>
            <span class="text-xs font-black uppercase tracking-widest text-(--brand) opacity-80">
                {role}
            </span>
        </div>
        <p class="mt-2 text-sm leading-relaxed opacity-60 sm:text-base">
            {description}
        </p>
    </div>
</div>