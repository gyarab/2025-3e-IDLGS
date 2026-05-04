<script lang="ts">
    import { m } from '$lib/paraglide/messages';
    import { darkenHex } from '$lib';
    import { onMount } from 'svelte';
    import TeamSvelte from './components/TeamSvelte.svelte';
    import { fly, fade } from 'svelte/transition';

    let {
        darkMode,
        color,
    }: {
        darkMode: boolean;
        color: string;
    } = $props();

    let ready = $state(false);

    onMount(() => {
        setTimeout(() => { ready = true; }, 100);
    });
</script>

<div
    class="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden p-6"
    style="background: linear-gradient(135deg, {color}, {darkenHex(color, 80)}); --brand: {color};"
>
    <div class="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-white opacity-5 blur-3xl animate-pulse"></div>
    <div class="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-(--brand) opacity-60 backdrop-blur-xs"></div>

    <i class="ri-group-line absolute right-1/12 top-1/4 scale-150 rotate-12 text-9xl text-white opacity-10"></i>
    <i class="ri-code-s-slash-line absolute left-1/12 bottom-1/4 scale-150 -rotate-12 text-9xl text-white opacity-10"></i>

    {#if ready}
        <div 
            class="z-10 flex w-full max-w-5xl flex-col gap-8 rounded-4xl p-8 shadow-2xl backdrop-blur-xl border border-white/10 sm:rounded-[3rem] md:p-12 {darkMode ? 'bg-neutral-900/60 text-white' : 'bg-white/70 text-black'}"
            in:fade={{ duration: 400 }}
        >
            <header class="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div class="max-w-2xl">
                    <h1 class="mb-4 text-4xl font-black tracking-tighter sm:text-6xl" in:fly={{ y: 20, duration: 600 }}>
                        {m.theTeam()}
                    </h1>
                    <p class="text-lg leading-relaxed font-medium opacity-70" in:fly={{ y: 20, duration: 600, delay: 100 }}>
                        {m.team_description()}
                    </p>
                </div>
            </header>

            <div class="h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent"></div>

            <div class="flex flex-col gap-10">
                <div class="shadow-2xl rounded-tr-3xl rounded-bl-3xl rounded-tl-[4rem] rounded-br-lg overflow-hidden border-l-4 border-[var(--brand)]" in:fly={{ x: -30, duration: 700, delay: 200 }}>
                    <TeamSvelte 
                        name="Martin Bykov" 
                        role="Project Manager"
                        description={m.martin_desc()} 
                        {darkMode}
                    />
                </div>
                
                <div class="self-end w-full sm:w-5/6 shadow-2xl rounded-tl-3xl rounded-br-3xl rounded-tr-[4rem] rounded-bl-lg overflow-hidden border-r-4 border-[var(--brand)]" in:fly={{ x: 30, duration: 700, delay: 400 }}>
                    <TeamSvelte 
                        name="Ali Yunussov" 
                        role="Lead Designer"
                        description={m.ali_desc()} 
                        {darkMode}
                        reverse={true}
                    />
                </div>

                <div class="shadow-2xl rounded-tr-3xl rounded-bl-3xl rounded-tl-[4rem] rounded-br-lg overflow-hidden border-l-4 border-[var(--brand)]" in:fly={{ x: -30, duration: 700, delay: 600 }}>
                    <TeamSvelte 
                        name="Kira Stepanova" 
                        role="Education Lead"
                        description={m.kira_desc()} 
                        {darkMode}
                    />
                </div>
            </div>
        </div>
    {/if}
</div>