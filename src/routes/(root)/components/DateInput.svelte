<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Button from './Button.svelte';
	import Tooltip from './Tooltip.svelte';

	let {
		cssClass = '',
		day = $bindable(1),
		month = $bindable(1),
		year = $bindable(1),
		min,
	}: {
		cssClass?: string;
		day: number;
		month: number;
		year: number;
		min?: Date;
	} = $props();

	let showTooltipDay = $state(false);
	let showTooltipMonth = $state(false);
	let showTooltipYear = $state(false);

	const months = [
		m.january(),
		m.february(),
		m.march(),
		m.april(),
		m.may(),
		m.june(),
		m.july(),
		m.august(),
		m.september(),
		m.october(),
		m.november(),
		m.december(),
	];

	const monthLengths = [
		31,
		// leap years: every 4 years, except every 100 years, but yes every 400 years
		(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31,
	];
</script>

<div
	class="{cssClass} input-text flex flex-row flex-nowrap items-center gap-0 p-2 font-light"
>
	<i class="ri-calendar-line pe-2"></i>
	<Button
		btn="button-none! p-0! font-light! relative"
		onclick={() => {
			showTooltipDay = !showTooltipDay;
			showTooltipMonth = false;
			showTooltipYear = false;
		}}
	>
		<span>
			{day}
		</span>
		{#key month || year}
			<Tooltip
				bind:showTooltip={showTooltipDay}
				cssClass="bg-violet-800 text-white"
				cssClass2="text-violet-800"
				notButton={true}
			>
				<div class="top-0 left-0 m-0! grid w-56 grid-cols-7 gap-1 p-0">
					{#each new Array(monthLengths[month - 1]) as _, i (i)}
						{#if !min || new Date(year, month - 1, i + 1) >= min}
							<Button
								btn="button-none! w-8!"
								onclick={() => {
									day = i + 1;
									showTooltipDay = false;
								}}
							>
								{i + 1}
							</Button>
						{:else}
							<span
								class="w-8! p-2 text-center text-nowrap italic opacity-80"
							>
								{i + 1}
							</span>
						{/if}
					{/each}
				</div>
			</Tooltip>
		{/key}
	</Button>
	<span>.</span>
	<Button
		btn="button-none! p-0! font-light! relative"
		onclick={() => {
			showTooltipDay = false;
			showTooltipMonth = !showTooltipMonth;
			showTooltipYear = false;
		}}
	>
		<span>
			{month}
		</span>
		{#key year || day}
			<Tooltip
				bind:showTooltip={showTooltipMonth}
				cssClass="bg-violet-800 text-white"
				cssClass2="text-violet-800"
				notButton={true}
			>
				<div class="m-0! flex w-full flex-col p-0">
					{#each months as monthData, i (monthData)}
						{#if !min || new Date(year, i, day) >= min}
							<Button
								btn="button-none! p-0! font-light! w-full text-center overflow-scroll! max-h-10"
								onclick={() => {
									month = i + 1;
									showTooltipMonth = false;
								}}
							>
								{monthData}
							</Button>
						{/if}
					{/each}
				</div>
			</Tooltip>
		{/key}
	</Button>
	<span>.</span>
	<div class="relative">
		<Button
			btn="button-none! p-0! font-light!"
			onclick={() => {
				showTooltipDay = false;
				showTooltipMonth = false;
				showTooltipYear = !showTooltipYear;
			}}
		>
			<span>
				{year}
			</span>
		</Button>
		{#key month || day}
			<Tooltip
				bind:showTooltip={showTooltipYear}
				cssClass="bg-violet-800 text-white"
				cssClass2="text-violet-800"
				notButton={true}
			>
				<div class="z-35 flex flex-row gap-2">
					<Button
						btn="button-none"
						onclick={(e) => {
							e.stopPropagation();
							year = year - 1;
							if (year < 1900) year = 1900;
						}}
						emoji="arrow-left-s"
						disabled={year <= 1900 ||
							(min && year <= min.getFullYear())}
					/>
					<span>
						{year}
					</span>
					<Button
						btn="button-none"
						onclick={(e) => {
							e.stopPropagation();
							year = year + 1;
							if (!min && year > new Date().getFullYear())
								year = new Date().getFullYear();
						}}
						emoji="arrow-right-s"
						disabled={!min && year >= new Date().getFullYear()}
					/>
				</div>
			</Tooltip>
		{/key}
	</div>
</div>
