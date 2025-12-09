/*
	RESIN Interactive Element System
	Author: Martin Bykov
*/

export class RElement {
	x: number = 0;
	y: number = 0;
	width: number = 0;
	height: number = 0;
	visible: boolean = true;
	bgcolor: string = "#aaaaaa";
	fgcolor: string = "#000000";
	rounded: number = 0;

	constructor() {

	}
};

export class RAnswerElement extends RElement {
	answer: string = "";

	checkAnswer(): boolean {
		return false;
	}
};