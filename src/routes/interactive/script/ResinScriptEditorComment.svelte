<!--

RESIN
Comment in script editor window
Author: Martin Bykov

-->
<script lang="ts">
	import { RESIN_MIN_COMMENT_SIZE_PX, type RScriptComment } from "$lib/interactive/script/comment.svelte";

	let {
		comment,
		uuid = $bindable("")
	} : {
		comment: RScriptComment,
		uuid: string
	} = $props();
</script>

<button
	class="
absolute z-39 flex flex-row rounded-lg p-2 font-medium items-center
"
	style="
	background-color: #ffd9b7;
	border:           2px solid #30211a;
	color:            #000000;
	top:              {comment.y}%;
	left:             {comment.x}%;
	width:            {comment.width}%;
	height:           {comment.height}%;
	min-width:        {RESIN_MIN_COMMENT_SIZE_PX}px;
	min-height:       {RESIN_MIN_COMMENT_SIZE_PX}px;
"
onclick={() => {
	uuid = comment.uuid;
}}
>
	{comment.text}
</button>

<!-- TODO connect to specific block -->