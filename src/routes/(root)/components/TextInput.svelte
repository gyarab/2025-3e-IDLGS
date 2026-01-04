<script lang="ts">
	let {
		cssClass = 'w-full',
		value = $bindable(""),
		label,
		name,
		placeholder,
	} = $props();
</script>

<div class="flex {cssClass} flex-row gap-2 items-center flex-nowrap">
	<span class="text-nowrap">{label}:</span>
	<input type="text" bind:value name={name} class="input-text" placeholder={placeholder} />
</div>