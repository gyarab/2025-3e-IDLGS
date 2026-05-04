<script lang="ts">
    import { m } from '$lib/paraglide/messages';
    import { darkenHex } from '$lib';
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';

    let {
        darkMode,
        color,
    }: {
        darkMode: boolean;
        color: string;
    } = $props();

    let ready = $state(false);

    onMount(() => {
        setTimeout(() => {
            ready = true;
        }, 100);
    });
</script>

<div
    class="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden p-6"
    style="background: linear-gradient(135deg, {color}, {darkenHex(color, 80)}); --brand: {color};"
>
    <!-- Background Decorative Elements -->
    <i class="ri-information-line absolute right-1/10 bottom-1/10 scale-150 rotate-12 text-9xl text-white opacity-10"></i>
    <i class="ri-global-line absolute left-1/10 top-1/10 scale-150 -rotate-12 text-9xl text-white opacity-10"></i>

    {#if ready}
        <div
            class="z-10 flex w-full max-w-5xl flex-col gap-8 rounded-3xl p-8 shadow-2xl backdrop-blur-md sm:rounded-4xl md:p-12 {darkMode 
                ? 'bg-neutral-900/80 text-white' 
                : 'bg-white/90 text-black'}"
            in:fade={{ duration: 400 }}
        >
            <header class="flex items-center gap-6">
                <div 
                    class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand)] text-white shadow-lg"
                    in:fly={{ x: -20, duration: 600 }}
                >
                    <i class="ri-team-line text-3xl"></i>
                </div>
                <div>
                    <h1 
                        class="text-3xl font-extrabold tracking-tight sm:text-5xl"
                        in:fly={{ x: 20, duration: 600 }}
                    >
                        {m.aboutUs()}
                    </h1>
                </div>
            </header>

            <hr class="opacity-10" />

            <div class="grid grid-cols-1 gap-8 md:grid-cols-12">
                <div class="relative md:col-span-8">
                    <!-- Large Quote Mark Decor -->
                    <span class="absolute -top-6 -left-4 text-7xl opacity-10 font-serif">“</span>
                    
                    <p 
                        class="relative z-10 text-lg leading-relaxed opacity-80 md:text-2xl md:leading-relaxed"
                        in:fly={{ y: 20, duration: 600, delay: 200 }}
                    >
                        {m.about_description()}
                    </p>
                </div>

                <div 
                    class="flex flex-col justify-center gap-4 md:col-span-4"
                    in:fly={{ x: 20, duration: 600, delay: 400 }}
                >
                    <div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                        <p class="text-xs font-bold uppercase tracking-widest opacity-50 mb-3">Core Pillars</p>
                        <ul class="space-y-3">
                            {#each [
                                { icon: 'ri-instance-line', text: '3D Models' },
                                { icon: 'ri-play-list-add-line', text: 'Multimedia' },
                                { icon: 'ri-shield-flash-line', text: 'Innovation' }
                            ] as item}
                                <li class="flex items-center gap-3">
                                    <i class="{item.icon} text-[var(--brand)]"></i>
                                    <span class="text-sm font-semibold">{item.text}</span>
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>