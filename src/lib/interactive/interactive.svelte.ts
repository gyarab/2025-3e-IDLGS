/*
	RESIN Interactive Element System
	Author: Martin Bykov
*/

import { RElement } from './element.svelte';
import { RElementAIChat } from './elements/aichat';
import { RElementArrowPoint } from './elements/arrowpoint';
import { RElementAudioPlayer } from './elements/audio';
import { RElementCard } from './elements/card';
import { RElementCartesian } from './elements/cartesian';
import { RElementCheckbox } from './elements/checkbox';
import { RElementCodeInput } from './elements/codeinput';
import { RElementEmbedFrame } from './elements/embed';
import { RElementGraph } from './elements/graph';
import { RElementImage } from './elements/image';
import { RElementInputTextArea } from './elements/inputtextarea';
import { RElementInputTextSmall } from './elements/inputtextsmall';
import { RElementLetterInput } from './elements/letterinput';
import { RElementText } from './elements/text';
import { RElementVideoPlayer } from './elements/video';
import type { RScriptBlock } from './script/block.svelte';
import { RScriptBlockVariableRead, RScriptBlockVariableWrite } from './script/blocks/variable';
import { RProgram } from './script/program.svelte';

export const RESIN_MAX_ELEMENTS = 1000;
export const RESIN_MAX_SNAP = 5;

//main element class
//array is polymorphic
export class RInteractive {
	elements: RElement[] = $state([]);
	bgcolor = $state('#dddddd');

	//aspect ratio as x/y
	aspect: number = $state(16 / 9);

	script: RProgram = $state(new RProgram());

	addElement(
		name: string,
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
		if(this.elements.length >= RESIN_MAX_ELEMENTS) return;
		this.elements.push(
			new RElement(name, x, y, width, height, visible, bgcolor, fgcolor, rounded, opacity)
		);
	}
	addElementDone(el: RElement) {
		if(this.elements.length >= RESIN_MAX_ELEMENTS) return;
		this.elements.push(el);
	}

	getElementByUuid(uuid: string): RElement | undefined {
		return this.elements.find((v) => v.uuid == uuid);
	}

	parsed: string = $derived.by(() => {
		return JSON.stringify({
			elements: this.elements.map((v) => v.toObject()),
			bgcolor: this.bgcolor,
			aspect: this.aspect,
		});
	});
}

export const getType = (el: RElement) => {
	return el.constructor.name;
};

export const getBlockType = (b: RScriptBlock) => {
	return b.constructor.name;
};