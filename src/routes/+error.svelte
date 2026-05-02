<script lang="ts">
    import { page } from '$app/state';
    import { m } from '$lib/paraglide/messages';
    import Button from '$src/routes/(base)/components/Button.svelte';
    import { darkenHex } from '$lib';

    // Fallback data in case the error happens before data is loaded
    // You can also try to pull these from a shared store or page state
    const color = "#3b82f6"; // Primary brand color
    const darkMode = true; 
</script>

<svelte:head>
    <title>{page.status} | {m.idlgs()}</title>
</svelte:head>

<div
    class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4"
    style="background: linear-gradient(135deg, {color}, {darkenHex(color, 80)}); --brand: {color};"
>
    <i class="ri-error-warning-line absolute right-1/10 top-1/6 scale-150 rotate-12 text-9xl text-white opacity-10"></i>
    <i class="ri-ghost-line absolute bottom-1/4 left-1/10 scale-150 -rotate-12 text-9xl text-white opacity-10"></i>

    <div
        class="z-10 flex w-full max-w-md flex-col items-center gap-8 rounded-3xl p-4 sm:p-8 shadow-2xl backdrop-blur-sm sm:rounded-4xl {darkMode
            ? 'bg-neutral-800/80 text-white'
            : 'bg-white/90 text-black'}"
    >
        <header class="flex flex-col items-center gap-4 text-center">
            <div
                class="flex h-20 w-20 items-center justify-center rounded-3xl border-2 animate-pulse"
                style:border-color="var(--brand)"
            >
                <span class="text-3xl font-black" style:color="var(--brand)">
                    {page.status}
                </span>
            </div>
            
            <div class="space-y-2">
                <h1 class="text-3xl font-bold tracking-tight">
                    {page.status === 404 ? 'Page Not Found' : 'Something went wrong'}
                </h1>
                <p class="text-sm font-medium opacity-60">
                    {page.error?.message || 'An unexpected error occurred. Please try again later.'}
                </p>
            </div>
        </header>

        <hr class="w-full opacity-20" />

        <div class="w-full space-y-3">
            <Button
                css="buttonPrimary w-full py-3 transition-transform active:scale-95"
                emoji="home-4"
				type="button"
                text="Return Home"
                style="background-color: var(--brand);"
                onclick={() => window.location.href = '/'}
            />
            
            <button 
                onclick={() => window.history.back()}
                class="w-full text-sm font-semibold opacity-50 hover:opacity-100 transition-opacity"
            >
                Go Back
            </button>
        </div>
    </div>
</div>