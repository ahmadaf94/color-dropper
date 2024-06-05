import useImageCanvas from "../hooks/useImageCanvas";

const imageCanvas = () => {
	const { canvasRef } = useImageCanvas();

	return <canvas ref={canvasRef} data-testid="image-canvas" />;
};

export default imageCanvas;
