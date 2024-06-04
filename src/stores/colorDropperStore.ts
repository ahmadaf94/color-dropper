import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type AppThunk } from ".";

export interface ColorDropperState {
	imageURL?: string;
	showPicker: boolean;
	pickerPosition: { x: number; y: number };
	color?: string;
	pickerColors?: Array<Array<Array<number>>>;
	canvasSize?: { width: number; height: number };
	selectedColor?: string;
}

const initialState: ColorDropperState = {
	showPicker: false,
	pickerPosition: { x: 0, y: 0 },
};

export const colorDropperSlice = createSlice({
	name: "color-dropper",
	initialState,
	reducers: {
		setImage: (state, { payload }: PayloadAction<string>) => ({
			...state,
			imageURL: payload,
		}),
		toggleShowPicker: (state) => ({
			...state,
			showPicker: !state.showPicker,
		}),
		setPickerPosition: (
			state,
			{ payload }: PayloadAction<{ x: number; y: number }>,
		) => ({
			...state,
			pickerPosition: payload,
		}),
		setColor: (state, { payload }: PayloadAction<string>) => ({
			...state,
			color: payload,
		}),
		setPickerColors: (
			state,
			{ payload }: PayloadAction<Array<Array<Array<number>>>>,
		) => ({
			...state,
			pickerColors: payload,
		}),
		setCanvasSize: (
			state,
			{ payload }: PayloadAction<{ width: number; height: number }>,
		) => ({
			...state,
			canvasSize: payload,
		}),
		setSelectedColor: (state, { payload }: PayloadAction<string>) => ({
			...state,
			selectedColor: payload,
		}),
	},
});

export const {
	setImage,
	toggleShowPicker,
	setPickerColors,
	setColor,
	setPickerPosition,
	setCanvasSize,
	setSelectedColor,
} = colorDropperSlice.actions;

const setImageFile =
	(image: File): AppThunk =>
	(dispatch) => {
		const url = URL.createObjectURL(image);

		dispatch(setImage(url));
	};

export { setImageFile };

export default colorDropperSlice.reducer;
