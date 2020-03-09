import { GRAPH_PADDING, AXIS_PADDING } from '../constants';

export const drawGraph = (
  context2d: CanvasRenderingContext2D,
  dataToDraw: Array<any>
): void => {
  const {
    canvas: { width, height },
  } = context2d;

  const numberOfPoints = dataToDraw.length;
  if (numberOfPoints === 0) {
    return;
  }

  const keys = Object.keys(dataToDraw[0]);
  if (keys.length !== 2) {
    return;
  }
  const yValues = dataToDraw.map(data => Number(data[keys[1]]));
  const { min: yMin, max: yMax } = getMinMax(yValues);

  const canvasPadding = GRAPH_PADDING * 2 + AXIS_PADDING * 2;
  const xGapBetweenPoints = (width - canvasPadding) / numberOfPoints;
  const yGapBetweenPoints = (height - canvasPadding) / (yMax - yMin);

  const getGraphRelatedY = (currentY: number): number =>
    GRAPH_PADDING + (yMax - currentY) * yGapBetweenPoints;

  let currentX = GRAPH_PADDING;
  context2d.beginPath();
  context2d.moveTo(currentX, getGraphRelatedY(yValues[0]));
  for (let i = 1; i < numberOfPoints; i++) {
    currentX += xGapBetweenPoints;
    context2d.lineTo(currentX, getGraphRelatedY(yValues[i]));
  }
  context2d.stroke();
};

const getMinMax = (values: number[]): { min: number; max: number } => {
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;

  for (const value of values) {
    if (value < min) {
      min = value;
    }

    if (value > max) {
      max = value;
    }
  }

  return { min, max };
};
