<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import NextPrevious from '../components/NextPrevious.svelte';
	import TextInput from '$component/TextInput.svelte';
	import Button from '$component/Button.svelte';
	import DateInput from '$component/DateInput.svelte';
	import CheckboxInput from '$component/CheckboxInput.svelte';

	let {
		step = $bindable(0),
		inviteCode = $bindable(''),
		inviteCodeUses = $bindable(0),
		inviteCodeExpiry = $bindable(new Date()),
	}: {
		step: number;
		inviteCode: string;
		inviteCodeUses: number;
		inviteCodeExpiry: Date;
	} = $props();

	if (inviteCode.length === 0) {
		inviteCode = crypto.randomUUID().split('-')[0];
	}

	let expiryCheck: boolean = $state(inviteCodeExpiry.getFullYear() < 3000);

	let expiryDay: number = $state(new Date().getDate());
	let expiryMonth: number = $state(new Date().getMonth() + 1);
	let expiryYear: number = $state(new Date().getFullYear());

	$effect(() => {
		if (expiryCheck) {
			inviteCodeExpiry = new Date(3000, 1, 1);
		} else {
			inviteCodeExpiry = new Date(expiryYear, expiryMonth - 1, expiryDay);
		}
	});
</script>

<div class="flex w-full grow flex-col gap-2">
	<h2>{m.courseInviteCode()}</h2>
	<div class="flex w-full grow flex-col gap-2">
		<div class="flex w-full flex-row items-center gap-2">
			<h2 class="text-xl">
				{m.courseInviteCode()}:
			</h2>
			<TextInput
				cssClass="grow"
				bind:value={inviteCode}
				placeholder={m.courseInviteCode()}
			/>
			<Button
				btn="button-white"
				emoji="loop-right"
				onclick={() => {
					inviteCode = crypto.randomUUID().split('-')[0];
				}}
			>
				{m.regenerateCourseInviteCode()}
			</Button>
		</div>
		<div class="flex w-full flex-row items-center gap-2">
			<h2 class="text-xl">
				{m.maximumInviteCodeUses()}:
			</h2>
			<input
				type="range"
				class="grow"
				min="0"
				max="1000"
				step="1"
				bind:value={inviteCodeUses}
			/>
			{#if inviteCodeUses == 0}
				<h2 class="text-xl">
					{m.unlimited()}
				</h2>
			{:else}
				<h2 class="text-xl">
					{inviteCodeUses}
				</h2>
			{/if}
		</div>
		<div class="flex w-full flex-row items-center gap-2">
			<h2 class="text-xl">
				{m.inviteCodeExpiryDate()}:
			</h2>
			<span class={expiryCheck ? 'pointer-events-none opacity-80' : ''}>
				<DateInput
					bind:day={expiryDay}
					bind:month={expiryMonth}
					bind:year={expiryYear}
					min={new Date()}
				/>
			</span>

			<CheckboxInput bind:checked={expiryCheck} />
			<span class="text-base">{m.noInviteCodeExpiryDate()}</span>
		</div>
	</div>
	<div class="flex w-full flex-col text-lg font-medium">
		{m.thisCodeIsLikeAPasswordForTheCourse()}.
		<br />
		{m.anyoneWithItCanJoinTheCourse()}.
		<br />
		{m.makeSureYouShareItOnlyWithPeopleWhomYouWantToJoinTheCourse()}.
	</div>
	<NextPrevious
		currentStep={4}
		maxStep={6}
		onclickLast={() => {
			step = 3;
		}}
		onclickNext={() => {
			step = 5;
		}}
		disableConditionNext={inviteCode.length === 0}
	/>
</div>
