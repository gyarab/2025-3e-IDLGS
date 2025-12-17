<script lang="ts">
	import Modal from '../../../components/Modal.svelte';
	import SelectType from './ASelectType.svelte';
	import CourseBasicInfo from './BCourseBasicInfo.svelte';
	import TextbookBasicInfo from './BTextbookBasicInfo.svelte';
	import CourseGrading from './CCourseGrading.svelte';
	import Ownership from './EOwnership.svelte';
	import Review from './FReview.svelte';
	import TextbookArticles from './DTextbookArticles.svelte';
	import CourseTextbookSelect from './DCourseTextbookSelect.svelte';

	let {
		showModal = $bindable()
	}: {
		showModal: boolean;
	} = $props();
</script>

<Modal bind:showModal cssClass="bg-violet-700">
	<!-- both -->
	<SelectType />

	<!-- course only -->
	<CourseTextbookSelect />
	<CourseBasicInfo />
	<CourseGrading />

	<!-- textbook only -->
	<TextbookBasicInfo />
	<TextbookArticles />

	<!-- both -->
	<Ownership />
	<Review />
</Modal>
