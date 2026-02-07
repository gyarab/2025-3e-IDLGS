<script lang="ts">
	import { m } from '$lib/paraglide/messages';

	let passwordVisible = $state(false);

	let {
		formName,
		label = '',
		placeholder = '',
		cssClass = '',
		cssLabelClass = '',
		value = $bindable(''),
	}: {
		formName: string;
		label?: string;
		placeholder?: string;
		cssClass?: string;
		cssLabelClass?: string;
		value?: string;
	} = $props();
</script>

<div class="relative flex w-full flex-col items-center justify-center gap-2">
	<div class="flex w-full grow flex-row items-center justify-center gap-2">
		{#if label.length != 0}
			<h3 class="whitespace-nowrap {cssLabelClass} font-light">
				{label}:
			</h3>
		{/if}
		<div
			class="flex w-full flex-row items-center justify-center overflow-hidden"
		>
			<input
				type={passwordVisible ? 'text' : 'password'}
				name={formName}
				class="{cssClass} {passwordVisible
					? ''
					: 'font-medium'} input-text overflow-hidden rounded-e-none!"
				placeholder={placeholder === ''
					? m.enterYourPassword()
					: placeholder}
				required
				bind:value
			/>
			<button
				aria-label={m.showPassword()}
				class="button-green rounded-s-none!"
				tabindex="-1"
				type="button"
				onclick={() => {
					passwordVisible = !passwordVisible;
				}}
			>
				{#if passwordVisible}
					<i class="ri-eye-off-line"></i>
				{:else}
					<i class="ri-eye-line"></i>
				{/if}
			</button>
		</div>
	</div>
</div>
