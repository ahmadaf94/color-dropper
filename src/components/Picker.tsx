import { createUseStyles } from "react-jss";
import SelectedColorRing from "../../static/images/Selected Color.svg?react";
import usePicker from "../hooks/usePicker";

export const PICKER_SIZE = 160 as const;
export const PICKER_WIDTH = PICKER_SIZE / 2;
export const GRID_CELLS_PER_SIDE = 10 as const;
const TOTAL_CELLS_PER_ROW = GRID_CELLS_PER_SIDE * 2 + 1;

const useStyles = createUseStyles({
	container: {
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: 10,
		cursor: "none",
		borderStyle: "solid",
		borderWidth: 5,
		borderRadius: "50%",
		width: PICKER_SIZE,
		height: PICKER_SIZE,
		overflow: "hidden",
	},
	colorCode: {
		left: 0,
		color: "black",
		right: 0,
		width: "fit-content",
		bottom: "26px",
		margin: "0 auto",
		position: "absolute",
		fontSize: "14px",
		backgroundColor: "lightgrey",
		padding: "2px 8px",
		borderRadius: "12px",
		textAlign: "center",
	},
	colorTable: {
		width: "100%",
		height: "100%",
		borderCollapse: "collapse",
		position: "absolute",
		zIndex: -1,
	},
	colorCells: {
		padding: 0,
		border: "1px solid gray",
		width: `calc(100% / ${TOTAL_CELLS_PER_ROW})`,
		height: `calc(100% / ${TOTAL_CELLS_PER_ROW})`,
	},
});

const Picker = () => {
	const classes = useStyles();
	const { handlePickColor, pickerColors, style, color } = usePicker();

	return (
		<div className={classes.container} style={style} onClick={handlePickColor}>
			{pickerColors && (
				<table className={classes.colorTable}>
					<tbody>
						{pickerColors.map((colorRow, index) => (
							<tr key={index}>
								{colorRow.map((colorCell, index) => (
									<td
										className={classes.colorCells}
										key={index}
										style={{
											backgroundColor: `rgba(${colorCell[0]}, ${colorCell[1]}, ${colorCell[2]}, ${colorCell[3]})`,
										}}
									></td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			)}

			<SelectedColorRing />

			<div className={classes.colorCode}>{color}</div>
		</div>
	);
};

export default Picker;
