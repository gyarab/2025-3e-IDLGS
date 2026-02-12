<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import WideCard from '$component/WideCard.svelte';
	import Button from '$component/Button.svelte';
	import { goto } from '$app/navigation';
	import AdminSidebarEntry from './AdminSidebarEntry.svelte';

	//TODO same system as chapter/articles in textbook sidebar
</script>

<div
	class="
	sticky top-0 left-0 h-[96svh] max-h-[96svh] min-w-1/5 overflow-clip
"
>
	<WideCard
		cssAddition="grow rounded-none! border-s-0! border-s-0! border-t-0! border-b-0! overflow-scroll"
	>
		<h2 class="flex flex-row items-center gap-1 border-b-2 border-white">
			<i class="ri-book-ai-line text-3xl"></i>
			{m.schoolAdministration()}
		</h2>

		<div
			class="
			flex w-full
			grow flex-col gap-0 text-lg *:border-collapse *:rounded-none *:border-t
			*:border-b *:border-white/20 *:p-1! *:first:border-t-0! *:last:border-b-0!
		"
		>
			<!-- home page -->
			<Button
				btn="button-none-p"
				emoji="home"
				onclick={() => {
					goto(`/admin/`);
				}}
			>
				<div class="flex w-full flex-row gap-1">
					{m.home()}
				</div>
			</Button>

			<AdminSidebarEntry
				emoji="presentation"
				name={m.teaching()}
			>
				<!-- absence -->
				<Button
					btn="button-none"
					emoji="map-pin"
					onclick={() => {
						goto(`/admin/presence/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.presence()}
					</div>
				</Button>

				<!-- excuses / omluvenky -->
				<Button
					btn="button-none"
					emoji="info-card"
					onclick={() => {
						goto(`/admin/excuses/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.excuses()}
					</div>
				</Button>

				<!-- lesson plan -->
				<Button
					btn="button-none"
					emoji="calendar-2"
					onclick={() => {
						goto(`/admin/plan/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.lessonPlan()}
					</div>
				</Button>

				<!-- substitution -->
				<Button
					btn="button-none"
					emoji="arrow-right-box"
					onclick={() => {
						goto(`/admin/substitution/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.substitution()}
					</div>
				</Button>

				<!-- event plan -->
				<Button
					btn="button-none"
					emoji="calendar-event"
					onclick={() => {
						goto(`/admin/events/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.eventsPlan()}
					</div>
				</Button>
			</AdminSidebarEntry>

			<AdminSidebarEntry
				emoji="road-map"
				name={m.teachingPlan()}
			>
				<Button
					btn="button-none"
					emoji="calendar-event"
					onclick={() => {
						goto(`/admin/subjects/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.subjects()}
					</div>
				</Button>
				<Button
					btn="button-none"
					emoji="graduation-cap"
					onclick={() => {
						goto(`/admin/graderules/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.classificationRules()}
					</div>
				</Button>
				<Button
					btn="button-none"
					emoji="group-2"
					onclick={() => {
						goto(`/admin/commissions/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.subjectCommisssions()}
					</div>
				</Button>
			</AdminSidebarEntry>

			<Button
				btn="button-none-p"
				emoji="mail-send"
				onclick={() => {
					goto(`/admin/communication/`);
				}}
			>
				<div class="flex w-full flex-row gap-1">
					{m.communication()}
				</div>
			</Button>

			<AdminSidebarEntry
				emoji="database-2"
				name={m.records()}
			>
				<!-- pupil list -->
				<Button
					btn="button-none"
					emoji="user-community"
					onclick={() => {
						goto(`/admin/pupils/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.schoolPupilList()}
					</div>
				</Button>

				<!-- employee list -->
				<Button
					btn="button-none"
					emoji="user-2"
					onclick={() => {
						goto(`/admin/employees/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.employees()}
					</div>
				</Button>

				<!-- problem records (injuries, broken stuff, everything) -->
				<Button
					btn="button-none"
					emoji="hospital"
					onclick={() => {
						goto(`/admin/injuries/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.injuryRecords()}
					</div>
				</Button>

				<Button
					btn="button-none"
					emoji="shield-user"
					onclick={() => {
						goto(`/admin/disciplinary/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.disciplinaryMeasures()}
					</div>
				</Button>
			</AdminSidebarEntry>

			<!-- library -->
			<Button
				btn="button-none-p"
				emoji="book-shelf"
				onclick={() => {
					goto(`/admin/library/`);
				}}
			>
				<div class="flex w-full flex-row gap-1">
					{m.library()}
				</div>
			</Button>

			<AdminSidebarEntry
				emoji="contract"
				name={m.exams()}
			>
				<!-- entry exams -->
				<Button
					btn="button-none"
					emoji="arrow-right-box"
					onclick={() => {
						goto(`/admin/entry/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.entryExams()}
					</div>
				</Button>

				<!-- maturita -->
				<Button
					btn="button-none"
					emoji="contract"
					onclick={() => {
						goto(`/admin/matura/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.matura()}
					</div>
				</Button>
			</AdminSidebarEntry>

			<AdminSidebarEntry
				emoji="cash"
				name={m.schoolFinances()}
			>
				<!-- teachers pay -->
				<Button
					btn="button-none"
					emoji="hand-coin"
					onclick={() => {
						goto(`/admin/pay/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.teachersPay()}
					</div>
				</Button>
			
				<!-- maintenance -->
				<Button
					btn="button-none"
					emoji="wrench"
					onclick={() => {
						goto(`/admin/maintenance/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.maintenance()}
					</div>
				</Button>

				<!-- inventory -->
				<Button
					btn="button-none"
					emoji="box-1"
					onclick={() => {
						goto(`/admin/inventory/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.inventory()}
					</div>
				</Button>

				<!-- budget -->
				<Button
					btn="button-none"
					emoji="wallet-3"
					onclick={() => {
						goto(`/admin/budget/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.schoolBudget()}
					</div>
				</Button>	

				<!-- billing information -->
				<Button
					btn="button-none"
					emoji="bill"
					onclick={() => {
						goto(`/admin/billing/`);
					}}
				>
					<div class="flex w-full flex-row gap-1">
						{m.billing()}
					</div>
				</Button>
			</AdminSidebarEntry>

			<!-- it -->
			<Button
				btn="button-none-p"
				emoji="computer"
				onclick={() => {
					goto(`/admin/it/`);
				}}
			>
				<div class="flex w-full flex-row gap-1">
					{m.itAdministration()}
				</div>
			</Button>
		</div>
	</WideCard>
</div>

<!-- TODO customize for teacher/director/subject commission member -->
<!-- TODO fix DB before that-->
