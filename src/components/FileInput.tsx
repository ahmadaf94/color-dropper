import useFileInput from "../hooks/useFileInput";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	uploadButton: {
		padding: "12px 8px",
		backgroundColor: "green",
		color: "white",
		alignSelf: "flex-start",
		cursor: "pointer",
	},
});

const FileInput = () => {
	const { inputRef, handleInputChange, handleClick } = useFileInput();

	const classes = useStyles();

	return (
		<>
			<button
				className={classes.uploadButton}
				onClick={handleClick}
				data-testid="file-input"
			>
				Select Image
			</button>

			<input
				type="file"
				ref={inputRef}
				accept="image/*"
				onChange={handleInputChange}
				hidden
			/>
		</>
	);
};

export default FileInput;
