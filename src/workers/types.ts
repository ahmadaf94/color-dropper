export interface IInitMessageType {
	type: "s-init";
	data: { canvas: OffscreenCanvas };
}

export interface IDrawMessageType {
	type: "s-drawImage";
	data: { image: ImageBitmap };
}

export interface ICropColorsMessageType {
	type: "s-cropColors";
	data: { x: number; y: number; radius: number };
}

export interface IResizeMessageType {
	type: "s-resize";
	data: { width: number; height: number };
}

export type IMessageType =
	| IInitMessageType
	| IDrawMessageType
	| IResizeMessageType
	| ICropColorsMessageType;

export interface ICropColorsResponseType {
	type: "r-cropColors";
	data: { centerColor: string; colors: Array<Array<Array<number>>> };
}

export type IResponseType = ICropColorsResponseType;
