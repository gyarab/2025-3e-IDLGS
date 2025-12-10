/*
	RESIN Interactive Element System
	Author: Martin Bykov
*/

export class RElement {
	x: number = $state(0);
	y: number = $state(0);
	width: number = $state(0);
	height: number = $state(0);
	visible: boolean = $state(true);
	bgcolor: string = $state("#aaaaaa");
	fgcolor: string = $state("#000000");
	rounded: number = $state(0);
	opacity: number = $state(1);
	uuid: string = $state(crypto.randomUUID());

	constructor(
		x: number, 
		y: number,
		width: number,
		height: number,
		visible: boolean,
		bgcolor: string,
		fgcolor: string,
		rounded: number,
		opacity: number,
	) {	
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.visible = visible;
		this.bgcolor = bgcolor;
		this.fgcolor = fgcolor;
		this.rounded = rounded;
		this.opacity = opacity;
	}

	toObject(): Object {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			visible: this.visible,
			bgcolor: this.bgcolor,
			fgcolor: this.fgcolor,
			rounded: this.rounded,
			opacity: this.opacity,
			uuid: this.uuid
		}
	}
};

export class RAnswerElement extends RElement {
	answer: string = "";

	checkAnswer(): boolean {
		return false;
	}
};