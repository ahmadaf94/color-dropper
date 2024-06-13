import useAppSelector from "./useAppSelector";
import useAppDispatch from "./useAppDispatch";
import { setSelectedColor } from "../stores/colorDropperStore";
import { CSSProperties } from "react";
import { GRID_CELLS_PER_SIDE, PICKER_WIDTH } from "../components/Picker";

const usePicker = () => {
	const position = useAppSelector(
		({ colorDropper }) => colorDropper.pickerPosition,
	);
	const color = useAppSelector(({ colorDropper }) => colorDropper.color);
	const pickerColors = useAppSelector(
		({ colorDropper }) => colorDropper.pickerColors,
	);
	const dispatch = useAppDispatch();

	const handlePickColor = () => {
		if (color) {
			dispatch(setSelectedColor(color));
		}
	};

	const cellBorder = (rowIndex: number, cellIndex: number) => {
		if (rowIndex === GRID_CELLS_PER_SIDE && cellIndex === GRID_CELLS_PER_SIDE) {
			return "1.5px solid white";
		}
	};

	const style: CSSProperties = {
		transform: `translate(${position.x - PICKER_WIDTH + "px"}, ${position.y - PICKER_WIDTH + "px"})`,
		borderColor: color,
	};

	return {
		pickerColors,
		handlePickColor,
		style,
		color,
		cellBorder,
	};
};

export default usePicker;
