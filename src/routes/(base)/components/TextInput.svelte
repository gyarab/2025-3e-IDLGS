<script lang="ts">
	let {
		type = 'text',
		darkMode,
		color,
		css,
		placeholder,
		value = $bindable(''),
		required = true,
	}: {
		type?: string;
		darkMode: boolean;
		color: string;
		css?: string;
		placeholder: string;
		value: string;
		required?: boolean;
	} = $props();
</script>

<div class="overflow-hidden! rounded-lg! {css}">
	<input
		bind:value
		{type}
		{placeholder}
		{required}
		class="w-full border-0 border-b-2 p-1 ps-3 pe-3 {darkMode
			? 'bg-neutral-700 text-white! placeholder:text-white!'
			: 'bg-neutral-100 text-black! placeholder:text-black!'}"
		style="border-color: {color};"
	/>
</div>
