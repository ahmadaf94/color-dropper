import useImageCanvas from "../hooks/useImageCanvas";

const imageCanvas = () => {
	const { canvasRef } = useImageCanvas();

	return <canvas ref={canvasRef} />;
};

export default imageCanvas;
