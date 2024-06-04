import {
	ICropColorsMessageType,
	IDrawMessageType,
	IInitMessageType,
	IResponseType,
} from "../workers/types";
import { RefObject, useEffect } from "react";
import {
	setCanvasSize,
	setColor,
	setPickerColors,
} from "../stores/colorDropperStore";
import { GRID_CELLS_PER_SIDE } from "../components/Picker";
import useImageLoader from "./useImageLoader";
import useAppDispatch from "./useAppDispatch";
import useAppSelector from "./useAppSelector";

const worker = new Worker(
	new URL("../workers/canvasWorker.ts", import.meta.url),
);

const useCanvasWorker = (canvasRef: RefObject<HTMLCanvasElement>) => {
	const { imageElement } = useImageLoader();
	const dispatch = useAppDispatch();
	const pickerPosition = useAppSelector(
		({ colorDropper }) => colorDropper.pickerPosition,
	);

	const init = () => {
		const offscreen = canvasRef.current?.transferControlToOffscreen();

		if (offscreen) {
			worker.postMessage(
				{
					type: "s-init",
					data: { canvas: offscreen },
				} satisfies IInitMessageType,
				[offscreen],
			);
		}
	};

	const resizeCanvas = (
		canvas: HTMLCanvasElement,
		dimensions: { width: number; height: number },
	) => {
		canvas.width = dimensions.width;
		canvas.height = dimensions.height;

		dispatch(setCanvasSize(dimensions));
	};

	const drawImage = () => {
		const canvas = new OffscreenCanvas(
			imageElement!.naturalWidth,
			imageElement!.naturalHeight,
		);

		canvas.getContext("2d")?.drawImage(imageElement!, 0, 0);

		worker.postMessage({
			type: "s-drawImage",
			data: {
				image: canvas.transferToImageBitmap(),
			},
		} satisfies IDrawMessageType);
	};

	useEffect(() => {
		if (imageElement && canvasRef.current) {
			resizeCanvas(canvasRef.current, {
				width: imageElement.naturalWidth,
				height: imageElement.naturalHeight,
			});

			init();

			drawImage();
		}
	}, [imageElement]);

	useEffect(() => {
		worker.postMessage({
			type: "s-cropColors",
			data: {
				radius: GRID_CELLS_PER_SIDE,
				x: pickerPosition.x,
				y: pickerPosition.y,
			},
		} satisfies ICropColorsMessageType);
	}, [pickerPosition]);

	useEffect(() => {
		worker.onmessage = ({
			data: { type, data },
		}: MessageEvent<IResponseType>) => {
			switch (type) {
				case "r-cropColors":
					dispatch(setColor(data.centerColor));
					dispatch(setPickerColors(data.colors));
					break;
			}
		};
	}, []);
};

export default useCanvasWorker;
