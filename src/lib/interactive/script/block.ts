/*
	RESIN Interactive Element System
	Author: Martin Bykov
*/

/*
Connection types:
- R: round
- A: arrow
- S: square
*/

export class RScriptBlock {
	connectionBottom: string = "";
	connectionTop: string = "";
	horizontalBlock: boolean = false; //if false: top/bottom have connections, if true; left/right have connections

	x: number = $state(0);
	y: number = $state(0);
	width: number = $state(0);
	height: number = $state(0);

	commented: boolean = $state(true);
};