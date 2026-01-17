<script lang="ts">
	import { writeDegree } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import type { UserTypeLimited, UserRoleType } from '$lib/types';
	import Button from '$component/Button.svelte';
	import SelectionInput from '$component/SelectionInput.svelte';

	let {
		user,
		removeHandler,
		roleHandler,
		red,
		green,
		blue,
		type,
	}: {
		user: UserTypeLimited;
		removeHandler: (uuid: string) => void;
		roleHandler: (roles: UserRoleType, uuid: string) => void;
		red: number;
		green: number;
		blue: number;
		type: string;
	} = $props();

	let valueInput: string = $state('none');

	const onRewriteSelectedValue = (newValue: string): void => {
		valueInput = newValue;
		let object: UserRoleType = {
			isEditor: false,
			isTeacher: false,
			isOwner: false,
		};
		switch (newValue) {
			case 'teacher':
				object.isEditor = false;
				object.isTeacher = true;
				object.isOwner = false;
				break;
			case 'editor':
				object.isEditor = true;
				object.isTeacher = false;
				object.isOwner = false;
				break;
			case 'owner':
				object.isEditor = true;
				object.isTeacher = true;
				object.isOwner = true;
				break;
		}

		roleHandler(object, user.uuid);
	};
</script>

<div
	class="flex w-full flex-row items-center gap-1 rounded-2xl p-2 text-white!"
	style="background-color: rgba({red}, {green}, {blue}, 0.7);"
>
	{#if user.degree}
		<span>{writeDegree(user.degree)}</span>
	{/if}
	<span class="text-xl font-light">{user.name}</span>
	<span class="text-xl font-medium">{user.surname}</span>
	<div class="grow"></div>
	<SelectionInput
		bind:value={() => valueInput, onRewriteSelectedValue}
		values={type == 'course'
			? ['none', 'teacher', 'owner']
			: ['none', 'editor', 'owner']}
		names={type == 'course'
			? [m.student(), m.teacher(), m.owner()]
			: [m.user(), m.editor(), m.owner()]}
	/>
	<div></div>
	<Button
		btn="button-white"
		emoji="delete-bin"
		onclick={() => {
			removeHandler(user.uuid);
		}}
	>
		{m.remove()}
	</Button>
</div>
