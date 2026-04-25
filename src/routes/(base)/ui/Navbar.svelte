<script lang="ts">
    import { fly } from 'svelte/transition';
    import { m } from '$lib/paraglide/messages';
    import NavButton from '$src/routes/(base)/components/NavBarButton.svelte';

    let {
        accentColor,
        open = $bindable(false),
        darkMode
    }: {
        accentColor: string;
        open: boolean;
        darkMode: boolean;
    } = $props();
</script>

{#if !open}
    <button
        class="fixed top-0 z-20 h-8 w-screen flex justify-center items-start"
        onclick={() => (open = true)}
        aria-label={m.openNavbar()}
    >
        <i 
            class="ri-arrow-down-s-fill {darkMode ? 'text-neutral-700' : 'text-white'} text-6xl! absolute -top-6 left-3/4"
            transition:fly|global={{ y: -50, duration: 200, opacity: 0 }}
        ></i>
    </button>
{/if}

{#if open}
    <div
        class="{darkMode ? 'bg-neutral-800 text-white' : 'bg-white text-black'} fixed top-0 z-10 flex h-[7svh] w-screen items-center border-b-2 shadow-xl"
        style="border-color: {accentColor};"
        transition:fly|global={{ y: -100, duration: 200, opacity: 0 }}
    >
        <div class="flex h-full w-full items-center px-4">
            
            <div class="w-[7svh] shrink-0"></div>

            <h2 class="hidden font-bold sm:block text-sm+ tracking-widest px-4 shrink-0">
                DIGITALNI UCEBNICA
            </h2>
            
            <div class="grow"></div>

            <nav class="flex h-full items-center gap-2">
                <NavButton 
                    onclick={() => {}}
                    icon="ri-user-line"
                    {accentColor}
                >
                    {m.profile()}
                </NavButton>

                <NavButton 
                    onclick={() => {}}
                    icon="ri-book-open-line"
                    {accentColor}
                >
                    {m.gallery()}
                </NavButton>

                <NavButton 
                    onclick={() => {}}
                    icon="ri-settings-4-line"
                    {accentColor}
                >
                    {m.settings()}
                </NavButton>

                <button 
                    onclick={() => open = false}
                    class="ml-4 p-2 opacity-50 hover:opacity-100"
                    aria-label={m.collapse?.() ?? 'Collapse'}
                >
                    <i class="ri-close-line text-xl"></i>
                </button>
            </nav>
        </div>
    </div>
    
    <div class="h-[7svh] w-screen"></div>
{:else}
    <div class="h-8 w-screen"></div>
{/if}
