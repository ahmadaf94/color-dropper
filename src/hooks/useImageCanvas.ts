import { useCallback, useEffect, useRef } from "react";
import useAppDispatch from "./useAppDispatch";
import { setPickerPosition } from "../stores/colorDropperStore";
import useAppSelector from "./useAppSelector";
import useCanvasWorker from "./useCanvasWorker";

const useImageCanvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useCanvasWorker(canvasRef);

	const dispatch = useAppDispatch();
	const showPicker = useAppSelector(
		({ colorDropper }) => colorDropper.showPicker,
	);

	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			if (!canvasRef.current) return;

			const rect = canvasRef.current.getBoundingClientRect();

			if (
				event.clientX >= rect.left &&
				event.clientX <= rect.right &&
				event.clientY >= rect.top &&
				event.clientY <= rect.bottom
			) {
				const x = event.clientX - rect.left;
				const y = event.clientY - rect.top;

				dispatch(
					setPickerPosition({
						x,
						y,
					}),
				);
			}
		},
		[setPickerPosition],
	);

	useEffect(() => {
		if (showPicker) {
			document.addEventListener("mousemove", handleMouseMove);
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
		};
	}, [handleMouseMove, showPicker]);

	return { canvasRef, handleMouseMove };
};

export default useImageCanvas;
