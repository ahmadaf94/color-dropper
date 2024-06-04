import useAppSelector from "./useAppSelector";

const useColorDropper = () => {
	const imageURL = useAppSelector(({ colorDropper }) => colorDropper.imageURL);
	const showPicker = useAppSelector(
		({ colorDropper }) => colorDropper.showPicker,
	);
	const selectedColor = useAppSelector(
		({ colorDropper }) => colorDropper.selectedColor,
	);

	return { imageURL, showPicker, selectedColor };
};

export default useColorDropper;
