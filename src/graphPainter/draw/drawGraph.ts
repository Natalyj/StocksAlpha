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
  // for faster calculations get characteristics in one run
  const { values: yValues, min: yMin, max: yMax } = getDataCharacteristics(
    dataToDraw,
    keys[1]
  );

  const getVariationFromYMax = (currentValue: number): number =>
    yMax - currentValue + 1;

  const bothSidesPadding = (GRAPH_PADDING + AXIS_PADDING) * 2;
  const xGapBetweenPoints = (width - bothSidesPadding) / (numberOfPoints - 1);
  const yGapBetweenPoints =
    (height - bothSidesPadding) / getVariationFromYMax(yMin);

  const graphEdgesPadding = GRAPH_PADDING + AXIS_PADDING;
  const getGraphRelatedY = (currentY: number): number =>
    graphEdgesPadding + getVariationFromYMax(currentY) * yGapBetweenPoints;

  let currentX = graphEdgesPadding;
  context2d.beginPath();
  context2d.moveTo(currentX, getGraphRelatedY(yValues[0]));
  for (let i = 1; i < numberOfPoints; i++) {
    currentX += xGapBetweenPoints;
    context2d.lineTo(currentX, getGraphRelatedY(yValues[i]));
  }
  context2d.stroke();
};

const getDataCharacteristics = (
  dataToDraw: Array<any>,
  key: string
): { values: number[]; min: number; max: number } => {
  const values: number[] = [];
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;

  dataToDraw.forEach(data => {
    const value = Number(data[key]);
    values.push(value);

    if (value < min) {
      min = value;
    }

    if (value > max) {
      max = value;
    }
  });

  return { values, min, max };
};
