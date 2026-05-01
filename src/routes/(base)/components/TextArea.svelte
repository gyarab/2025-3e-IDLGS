<script lang="ts">
	let {
		darkMode,
		color,
		css,
		placeholder,
		value = $bindable(''),
		resizable = false,
		rows = 2,
		required = true,
	}: {
		darkMode: boolean;
		color: string;
		css?: string;
		placeholder: string;
		value: string;
		resizable?: boolean;
		rows?: number;
		required?: boolean;
	} = $props();
</script>

<div class="overflow-hidden! rounded-lg! {css} flex flex-col">
	<textarea
		bind:value
		{placeholder}
		{rows}
		{required}
		class="{resizable
			? 'resize'
			: 'resize-none'} w-full grow border-0 border-b-2 p-1 ps-3 pe-3 {darkMode
			? 'bg-neutral-700 text-white! placeholder:text-white!'
			: 'bg-neutral-200 text-black! placeholder:text-black!'}"
		style="border-color: {color};"
	></textarea>
</div>
