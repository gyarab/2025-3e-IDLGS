<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import Button from "./Button.svelte";

    let { 
        color,
        showText, 
        onclick = () => history.back() 
    }: {
        color: string; 
        showText: boolean; 
        onclick?: () => void;
    } = $props();
</script>

<Button
    emoji="arrow-left-s"
    text={showText ? m.goBack() : ''}
    type="button"
    onclick={onclick}
    css="buttonIcon"
    style="background-color: {color};"
/>