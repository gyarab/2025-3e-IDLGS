<script lang="ts">
	import { browser } from '$app/environment';
	//TODO
	//This is just test impl using internal library libresin
	//at some point it will be proper NPM package

	import { Resin, ResinElements } from 'libresin';
	import { onMount } from 'svelte';

	onMount(() => {
		if(browser) {
			const canvas = document.getElementById('canvas') as HTMLCanvasElement;
			const consoleOutput = document.getElementById('console') as HTMLElement;

			const resin = new Resin(canvas, consoleOutput);
			const chck = new ResinElements.Checkbox();

			console.log(resin);
			resin.elements.push(chck);

			(resin.elements[0] as ResinElements.Checkbox).width = 50;
			(resin.elements[0] as ResinElements.Checkbox).height = 50;
			(resin.elements[0] as ResinElements.Checkbox).x = 200;
			(resin.elements[0] as ResinElements.Checkbox).y = 200;
			(resin.elements[0] as ResinElements.Checkbox).rotation = 45;
			(resin.elements[0] as ResinElements.Checkbox).accentColor = "#ff0000";
			(resin.elements[0] as ResinElements.Checkbox).checked = false;

			(resin.elements[0] as ResinElements.Checkbox).render(resin.canvas.ctx, resin.canvas.width, resin.canvas.height);

			console.log(resin.elements[0] as ResinElements.Checkbox);
		}
	});
</script>

<canvas id="canvas" width="800" height="600"></canvas>
<span id="console" class="bg-amber-400 w-1/2 h-1/2 grow"></span>