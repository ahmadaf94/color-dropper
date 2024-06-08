import { createUseStyles } from "react-jss";
import FileInput from "./FileInput";
import ImageCanvas from "./ImageCanvas";
import ColorPickerButton from "./ColorPickerButton";
import Picker from "./Picker";
import useColorDropper from "../hooks/useColorDropper";

const useStyles = createUseStyles({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: 32,
	},
	canvasWrapper: {
		maxWidth: "100%",
		position: "relative",
	},
	buttonsContainer: {
		display: "flex",
		flexDirection: "row",
		gap: 32,
		margin: "24px auto 0",
		justifyContent: "center",
		alignItems: "center",
	},
	selectedColor: {
		color: "white",
	},
});

export const ColorDropper = () => {
	const { imageURL, showPicker, selectedColor } = useColorDropper();
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.buttonsContainer}>
				<FileInput />

				{imageURL && <ColorPickerButton />}

				{selectedColor && (
					<span className={classes.selectedColor} data-testid="selected-color">
						{selectedColor}
					</span>
				)}
			</div>

			{imageURL && (
				<div className={classes.canvasWrapper} key={imageURL}>
					<ImageCanvas />

					{showPicker && <Picker />}
				</div>
			)}
		</div>
	);
};

export default ColorDropper;
