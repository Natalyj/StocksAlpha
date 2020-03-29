export const drawGraph = (
  context2d: CanvasRenderingContext2D,
  dataCoordinates: Map<number, number>
): void => {
  console.log(dataCoordinates);
  let wasDrawingInitiated = false;

  context2d.beginPath();

  for (const [x, y] of dataCoordinates) {
    if (!wasDrawingInitiated) {
      context2d.moveTo(x, y);
      wasDrawingInitiated = true;
    } else {
      context2d.lineTo(x, y);
    }
  }

  context2d.stroke();
};
