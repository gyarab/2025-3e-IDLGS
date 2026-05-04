<script lang="ts">
    import { darkenHex } from '$lib';
    import { m } from '$lib/paraglide/messages';
    import Button from '../components/Button.svelte';
    import { goto } from '$app/navigation';

    let {
        data,
    }: {
        data: {
            darkMode: boolean;
            color: string;
        };
    } = $props();

    const sections = [
        { title: m.privacy_data_collection_title(), content: m.privacy_data_collection_body() },
        { title: m.privacy_usage_title(), content: m.privacy_usage_body() },
        { title: m.privacy_security_title(), content: m.privacy_security_body() },
        { title: m.privacy_cookies_title(), content: m.privacy_cookies_body() }
    ];
</script>

<svelte:head>
    <title>{m.privacy_policy()} | {m.idlgs()}</title>
</svelte:head>

<div
    class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4 py-12"
    style="background: linear-gradient(135deg, {data.color}, {darkenHex(
        data.color,
        80,
    )}); --brand: {data.color};"
>
    <!-- Decorative Background Icons -->
    <i class="ri-shield-check-line absolute right-1/20 bottom-1/6 scale-200 rotate-15 text-9xl text-white opacity-20"></i>
    <i class="ri-lock-password-line absolute top-1/4 left-1/20 scale-200 -rotate-15 text-9xl text-white opacity-20"></i>

    <div
        class="z-10 flex w-full max-w-2xl flex-col gap-6 rounded-3xl p-6 shadow-2xl backdrop-blur-sm sm:rounded-4xl md:p-10 {data.darkMode
            ? 'bg-neutral-800/80 text-white'
            : 'bg-white/90 text-black'}"
    >
        <header class="flex flex-col gap-2">
            <div class="flex items-center gap-4">
                 <Button 
                    text="" 
                    emoji="arrow-left" 
                    type="button" 
                    css="rounded-full p-2 h-10 w-10 flex items-center justify-center bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10"
                    onclick={() => history.back()}
                />
                <h1 class="text-3xl font-black tracking-tight sm:text-4xl">{m.privacyPolicy()}</h1>
            </div>
            <p class="text-sm opacity-60">{m.lastUpdated()}: </p>
        </header>

        <hr class="opacity-20" />

        <div class="space-y-8 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
            {#each sections as section}
                <section>
                    <h2 class="mb-3 text-lg font-bold uppercase tracking-wider" style="color: var(--brand)">
                        {section.title}
                    </h2>
                    <p class="leading-relaxed opacity-80">
                        {section.content}
                    </p>
                </section>
            {/each}
        </div>

        <hr class="opacity-20" />

        <footer class="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p class="text-xs opacity-50 sm:text-sm">
                {m.contactPrompt()} 
                <span class="font-bold" style="color: var(--brand)">support@idlgs.com</span>
            </p>
            <Button
                text={m.backToHome()}
                emoji="home"
                type="button"
                css="rounded-full px-6 py-2 font-semibold hover:opacity-90"
                style="background-color: var(--brand); color: white;"
                onclick={() => goto('/')}
            />
        </footer>
    </div>
</div>
