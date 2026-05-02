<script lang="ts">
	import type { TextbookType, UserType } from "$lib/types";
	import type { ResourceType } from "cloudinary";

	let {
		darkMode,
		color,
		data,
	}: {
		darkMode: boolean;
		color: string;
		data: {
			user: UserType,
			textbook: TextbookType,
			resources: ResourceType[],
		}
	} = $props();
</script>

<div>

</div>