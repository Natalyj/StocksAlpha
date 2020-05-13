import { AXIS_PICKING_ZONE, GRAPH_PADDING } from '../constants';
import {
  Point2D,
  RectangleCoords,
  AxisCoords,
  GraphCoordinates,
  Actions,
  CorrespondingCoordinates,
} from '../types';
import { roundFast } from '../utils';

export const addControlLine = (
  context2d: CanvasRenderingContext2D,
  axisCoords: AxisCoords,
  graphCoordinates: GraphCoordinates,
  actions: Actions
): void => {
  const { canvas } = context2d;
  const { axesBegin, xAxesEnd, yAxesEnd } = axisCoords;

  const graphBoundingRect: RectangleCoords = {
    lowLeftCoords: {
      x: axesBegin.x + GRAPH_PADDING,
      y: axesBegin.y,
    },
    highRightCoords: {
      x: xAxesEnd.x - GRAPH_PADDING,
      y: yAxesEnd.y,
    },
  };

  let currentMode = false;

  canvas.onmousemove = (event: MouseEvent): void => {
    const { x, y } = event;
    if (isBetweenExtendedZone({ x, y }, graphBoundingRect)) {
      const roundedX = roundFast(x);

      context2d.clearRect(0, 0, canvas.width, canvas.height);
      context2d.beginPath();

      const { interpolatedY, actualX, actualY } = getCorrespondingCoordinates(
        roundedX,
        graphCoordinates
      );

      drawControlPoint(context2d, roundedX, interpolatedY);
      context2d.moveTo(roundedX, axesBegin.y);
      context2d.lineTo(roundedX, yAxesEnd.y);

      context2d.stroke();

      currentMode = setStoreValues(
        currentMode,
        { x, y },
        actualX,
        actualY,
        actions
      );
    } else {
      currentMode = resetStoreValues(currentMode, actions);
    }
  };
};

const isBetweenExtendedZone = (
  point: Point2D,
  rect: RectangleCoords
): boolean => {
  const { lowLeftCoords, highRightCoords } = rect;

  const isBetweenX = point.x >= lowLeftCoords.x && point.x <= highRightCoords.x;
  const isBetweenY =
    point.y <= lowLeftCoords.y + AXIS_PICKING_ZONE &&
    point.y >= highRightCoords.y;

  return isBetweenX && isBetweenY;
};

const drawControlPoint = (
  context2d: CanvasRenderingContext2D,
  x: number,
  y: number
): void => {
  const radius = 2;
  const startAngle = 0;
  const endAngle = 2 * Math.PI;

  context2d.beginPath();
  context2d.arc(x, y, radius, startAngle, endAngle);
  context2d.fill();
};

const getCorrespondingCoordinates = (
  x: number,
  graphCoordinates: GraphCoordinates
): CorrespondingCoordinates => {
  let interpolatedY = 0;
  const { initialX, xStep, xValues, yValues, yCoordinates } = graphCoordinates;

  const diff = x - initialX;
  const farIndex = diff / xStep;
  const upperIndex = Math.ceil(farIndex);
  const lowerIndex = Math.floor(farIndex);

  if (farIndex === upperIndex || farIndex === lowerIndex) {
    interpolatedY = yCoordinates[farIndex];
  } else {
    const roundedStep = roundFast(xStep);

    const lowerY = yCoordinates[lowerIndex];
    const upperY = yCoordinates[upperIndex];

    const lowerX = roundFast(initialX + lowerIndex * xStep);
    const upperX = roundFast(lowerX + xStep);

    // the formula for linear interpolation of y in the interval [lowerX, upperX]
    interpolatedY =
      (lowerY * (upperX - x) + upperY * (x - lowerX)) / roundedStep;
  }

  return {
    interpolatedY: roundFast(interpolatedY),
    actualX: xValues[lowerIndex],
    actualY: yValues[lowerIndex].toString(),
  };
};

const resetStoreValues = (
  currentInteractionMode: boolean,
  actions: Actions
): boolean => {
  const { setInteractionMode, setMousePosition, setCurrentY } = actions;

  if (currentInteractionMode) {
    currentInteractionMode = false;
    setInteractionMode(currentInteractionMode);
    setMousePosition({ x: 0, y: 0 });
    setCurrentY('');
  }

  return currentInteractionMode;
};

const setStoreValues = (
  currentInteractionMode: boolean,
  mousePosition: Point2D,
  actualX: string,
  actualY: string,
  actions: Actions
): boolean => {
  const {
    setInteractionMode,
    setMousePosition,
    setCurrentX,
    setCurrentY,
  } = actions;

  if (!currentInteractionMode) {
    currentInteractionMode = true;
    setInteractionMode(currentInteractionMode);
  }
  setCurrentX(actualX);
  setCurrentY(actualY);
  setMousePosition(mousePosition);

  return currentInteractionMode;
};
