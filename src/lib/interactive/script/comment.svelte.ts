export const RESIN_MIN_COMMENT_SIZE_PX = 200;

export class RScriptComment {
	uuid: string = $state("");
	text: string = $state("");

	x: number = $state(0);
	y: number = $state(0);
	width: number = $state(0);
	height: number = $state(0);

	constructor(
		text: string,
		x: number,
		y: number,
		width: number,
		height: number,
	) {
		this.text = text;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
}
