import { ChangeEvent, useRef } from "react";
import useAppDispatch from "./useAppDispatch";
import { setImageFile } from "../stores/colorDropperStore";

export default function useFileInput() {
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();

	const handleClick = () => inputRef.current?.click();

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			event.target.files = null;

			dispatch(setImageFile(file));
		}
	};

	return { inputRef, handleInputChange, handleClick };
}
