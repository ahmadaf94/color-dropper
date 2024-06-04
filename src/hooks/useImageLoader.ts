import { useEffect, useState } from "react";
import useAppSelector from "./useAppSelector";

const useImageLoader = () => {
	const imageURL = useAppSelector(({ colorDropper }) => colorDropper.imageURL);
	const [imageElement, setImageElement] = useState<HTMLImageElement>();

	const loadImage = (src: string) => {
		const image = new Image(100, 100);

		image.onload = () => {
			setImageElement(image);
		};

		image.src = src;
	};

	useEffect(() => {
		if (imageURL) {
			loadImage(imageURL);
		}
	}, [imageURL]);

	return { imageElement };
};

export default useImageLoader;
