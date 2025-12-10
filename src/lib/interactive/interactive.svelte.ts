/*
	RESIN Interactive Element System
	Author: Martin Bykov
*/

import { RElement } from "./element.svelte";
import { RElementAIChat } from "./elements/aichat";
import { RElementArrowPoint } from "./elements/arrowpoint";
import { RElementAudioPlayer } from "./elements/audio";
import { RElementCard } from "./elements/card";
import { RElementCartesian } from "./elements/cartesian";
import { RElementCheckbox } from "./elements/checkbox";
import { RElementCodeInput } from "./elements/codeinput";
import { RElementEmbedFrame } from "./elements/embed";
import { RElementGraph } from "./elements/graph";
import { RElementImage } from "./elements/image";
import { RElementInputTextArea } from "./elements/inputtextarea";
import { RElementInputTextSmall } from "./elements/inputtextsmall";
import { RElementLetterInput } from "./elements/letterinput";
import { RElementText } from "./elements/text";
import { RElementVideoPlayer } from "./elements/video";

//main element class
//array is polymorphic
export class RInteractive {
	elements: RElement[] = $state([]);
	bgcolor = $state("#dddddd");

	//aspect ratio as x/y
	aspect: number = $state(16 / 9);

	addElement(
		x: number,
		y: number,
		width: number,
		height: number,
		visible: boolean,
		bgcolor: string,
		fgcolor: string,
		rounded: number,
		opacity: number
	) {
		this.elements.push(new RElement(
			x, y, width, height, visible, bgcolor, fgcolor, rounded, opacity
		));
	}
	addElementDone(el: RElement) {
		this.elements.push(el);
	}

	getElementByUuid(uuid: string): RElement | undefined {
		return this.elements.find((v) => v.uuid == uuid);
	}

	parsed: string = $derived.by(() => {
		return JSON.stringify({
			elements: this.elements.map(v => v.toObject()),
			bgcolor: this.bgcolor,
			aspect: this.aspect,
		})
	});
}

export const getType = (el: RElement) => {
	if (el instanceof RElementAIChat) return "RElementAIChat";
	else if (el instanceof RElementArrowPoint) return "RElementArrowPoint";
	else if (el instanceof RElementAudioPlayer) return "RElementAudioPlayer";
	else if (el instanceof RElementCard) return "RElementCard";
	else if (el instanceof RElementCartesian) return "RElementCartesian";
	else if (el instanceof RElementCheckbox) return "RElementCheckbox";
	else if(el instanceof RElementCodeInput) return "RElementCodeInput";
	else if(el instanceof RElementEmbedFrame) return "RElementEmbedFrame";
	else if(el instanceof RElementGraph) return "RElementGraph";
	else if(el instanceof RElementImage) return "RElementImage";
	else if(el instanceof RElementInputTextArea) return "RElementInputTextArea";
	else if(el instanceof RElementInputTextSmall) return "RElementInputTextSmall";
	else if(el instanceof RElementLetterInput) return "RElementLetterInput";
	else if(el instanceof RElementText) return "RElementText";
	else if(el instanceof RElementVideoPlayer) return "RElementVideoPlayer";
	else return "RElement?";
}