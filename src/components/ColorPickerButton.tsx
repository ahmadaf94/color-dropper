import IconColorPicker from "../../static/images/IconColorPicker.svg?react";
import { createUseStyles } from "react-jss";
import useAppDispatch from "../hooks/useAppDispatch";
import { toggleShowPicker } from "../stores/colorDropperStore";

const useStyles = createUseStyles({
	colorPickerButton: {
		width: 40,
		height: 40,
		borderRadius: "50%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		cursor: "pointer",
	},
});

const ColorPickerButton = () => {
	const classes = useStyles();
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(toggleShowPicker());
	};

	return (
		<button
			className={classes.colorPickerButton}
			onClick={handleClick}
			data-testid="color-picker-button"
		>
			<IconColorPicker />
		</button>
	);
};

export default ColorPickerButton;
